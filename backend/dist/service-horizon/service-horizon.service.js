"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ServiceHorizonService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceHorizonService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let ServiceHorizonService = ServiceHorizonService_1 = class ServiceHorizonService {
    supabaseService;
    logger = new common_1.Logger(ServiceHorizonService_1.name);
    BASE_OIL_INTERVAL_KM = 10000;
    BASE_OIL_INTERVAL_HOURS = 250;
    CORRUGATION_MULTIPLIER = 0.5;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async getEngineHealth(vehicleId) {
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
        if (!vehicle) {
            return {
                oilLifePercent: 0,
                status: 'UNKNOWN',
                msg: 'Vehicle data not found'
            };
        }
        const kmSinceService = vehicle.odometer_km - (lastService?.odometer || 0);
        const avgCorrugation = trips?.reduce((acc, t) => acc + (t.corrugation_avg || 0), 0) / (trips?.length || 1) || 1;
        const stressFactor = avgCorrugation > 5 ? 1 + (avgCorrugation - 5) * 0.1 : 1;
        const oilLifePercent = Math.max(0, 100 - (kmSinceService / (this.BASE_OIL_INTERVAL_KM / stressFactor)) * 100);
        const totalKmInLast20Trips = trips?.reduce((acc, t) => acc + ((t.end_odometer || 0) - t.start_odometer), 0) || 0;
        const totalDays = trips?.length ? (new Date(trips[0].end_time).getTime() - new Date(trips[trips.length - 1].start_time).getTime()) / (1000 * 60 * 60 * 24) : 30;
        const avgKmPerDay = totalKmInLast20Trips / (totalDays || 1);
        const kmRemaining = Math.max(0, (this.BASE_OIL_INTERVAL_KM / stressFactor) - kmSinceService);
        const daysToService = kmRemaining / (avgKmPerDay || 50);
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
};
exports.ServiceHorizonService = ServiceHorizonService;
exports.ServiceHorizonService = ServiceHorizonService = ServiceHorizonService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], ServiceHorizonService);
//# sourceMappingURL=service-horizon.service.js.map