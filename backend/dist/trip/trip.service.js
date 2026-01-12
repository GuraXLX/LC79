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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let TripService = class TripService {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async startTrip(data) {
        const { data: trip, error } = await this.supabaseService.getClient()
            .from('Trip')
            .insert({ ...data, start_time: new Date().toISOString() })
            .select()
            .single();
        if (error)
            throw error;
        return trip;
    }
    async endTrip(id, endOdometer, terrain, corrugation) {
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
        if (error)
            throw error;
        return trip;
    }
    async getRecent(vehicleId) {
        const { data, error } = await this.supabaseService.getClient()
            .from('Trip')
            .select('*')
            .eq('vehicle_id', vehicleId)
            .order('start_time', { ascending: false })
            .limit(10);
        if (error)
            throw error;
        return data;
    }
};
exports.TripService = TripService;
exports.TripService = TripService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], TripService);
//# sourceMappingURL=trip.service.js.map