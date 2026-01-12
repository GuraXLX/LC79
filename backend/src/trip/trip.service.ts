import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class TripService {
    constructor(private supabaseService: SupabaseService) { }

    async startTrip(data: any) {
        const { data: trip, error } = await this.supabaseService.getClient()
            .from('Trip')
            .insert({ ...data, start_time: new Date().toISOString() })
            .select()
            .single();
        if (error) throw error;
        return trip;
    }

    async endTrip(id: string, endOdometer: number, terrain: string, corrugation: number) {
        const { data: trip, error } = await this.supabaseService.getClient()
            .from('Trip')
            .update({
                end_time: new Date().toISOString(),
                end_odometer: endOdometer,
                terrain_type: terrain,
                corrugation_avg: corrugation
            })
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return trip;
    }

    async getRecent(vehicleId: string) {
        const { data, error } = await this.supabaseService.getClient()
            .from('Trip')
            .select('*')
            .eq('vehicle_id', vehicleId)
            .order('start_time', { ascending: false })
            .limit(10);
        if (error) throw error;
        return data;
    }
}
