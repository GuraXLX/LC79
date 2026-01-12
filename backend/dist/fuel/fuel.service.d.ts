import { SupabaseService } from '../supabase/supabase.service';
export declare class FuelService {
    private supabaseService;
    constructor(supabaseService: SupabaseService);
    create(data: any): Promise<any>;
    findAll(vehicleId: string): Promise<any[]>;
}
