import { SupabaseService } from '../supabase/supabase.service';
export declare class TripService {
    private supabaseService;
    constructor(supabaseService: SupabaseService);
    startTrip(data: any): Promise<any>;
    endTrip(id: string, endOdometer: number, terrain: string, corrugation: number): Promise<any>;
    getRecent(vehicleId: string): Promise<any[]>;
}
