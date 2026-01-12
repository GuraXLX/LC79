import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ServiceHorizonService {
    private readonly logger = new Logger(ServiceHorizonService.name);

    // LC79 Specific Constants (1VD-FTV Engine)
    private readonly BASE_OIL_INTERVAL_KM = 10000;
    private readonly BASE_OIL_INTERVAL_HOURS = 250;
    private readonly CORRUGATION_MULTIPLIER = 0.5; // Harsh roads reduce oil life by 50% max

    constructor(private supabaseService: SupabaseService) { }

    async getEngineHealth(vehicleId: string) {
        // 1. Fetch Vehicle Telemetry & Logs
        const { data: vehicle } = await this.supabaseService.getClient()
            .from('Vehicle')
            .select('odometer_km, engine_hours')
            .eq('id', vehicleId)
            .single();

        const { data: lastService } = await this.supabaseService.getClient()
            .from('ServiceLog')
            .select('odometer, date')
            .eq('vehicle_id', vehicleId)
            .order('date', { ascending: false })
            .limit(1)
            .single();

        const { data: trips } = await this.supabaseService.getClient()
            .from('Trip')
            .select('corrugation_avg, end_time, start_time, start_odometer, end_odometer')
            .eq('vehicle_id', vehicleId)
            .order('start_time', { ascending: false })
            .limit(20);

        // 2. Calculate Oil Life %
        if (!vehicle) {
            return {
                oilLifePercent: 0,
                status: 'UNKNOWN',
                msg: 'Vehicle data not found'
            };
        }
        const kmSinceService = vehicle.odometer_km - (lastService?.odometer || 0);
        const avgCorrugation = trips?.reduce((acc, t) => acc + (t.corrugation_avg || 0), 0) / (trips?.length || 1) || 1;

        // Algorithm: Oil Life decreases faster if corrugation > 5
        const stressFactor = avgCorrugation > 5 ? 1 + (avgCorrugation - 5) * 0.1 : 1;
        const oilLifePercent = Math.max(0, 100 - (kmSinceService / (this.BASE_OIL_INTERVAL_KM / stressFactor)) * 100);

        // 3. Predict Service Horizon
        const totalKmInLast20Trips = trips?.reduce((acc, t) => acc + ((t.end_odometer || 0) - t.start_odometer), 0) || 0;
        const totalDays = trips?.length ? (new Date(trips[0].end_time).getTime() - new Date(trips[trips.length - 1].start_time).getTime()) / (1000 * 60 * 60 * 24) : 30;
        const avgKmPerDay = totalKmInLast20Trips / (totalDays || 1);

        const kmRemaining = Math.max(0, (this.BASE_OIL_INTERVAL_KM / stressFactor) - kmSinceService);
        const daysToService = kmRemaining / (avgKmPerDay || 50); // Default to 50km/day if no data
        const predictedDate = new Date();
        predictedDate.setDate(predictedDate.getDate() + daysToService);

        return {
            oilLifePercent: Math.round(oilLifePercent),
            avgCorrugation: avgCorrugation.toFixed(1),
            kmSinceService,
            predictedServiceDate: predictedDate.toISOString(),
            daysRemaining: Math.round(daysToService),
            status: oilLifePercent < 15 ? 'CRITICAL' : oilLifePercent < 30 ? 'WARNING' : 'HEALTHY'
        };
    }
}
