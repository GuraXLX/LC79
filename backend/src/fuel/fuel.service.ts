import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class FuelService {
    constructor(private supabaseService: SupabaseService) { }

    async create(data: any) {
        const { data: log, error } = await this.supabaseService.getClient()
            .from('FuelLog')
            .insert(data)
            .select()
            .single();
        if (error) throw error;
        return log;
    }

    async findAll(vehicleId: string) {
        const { data, error } = await this.supabaseService.getClient()
            .from('FuelLog')
            .select('*')
            .eq('vehicle_id', vehicleId)
            .order('date', { ascending: false });
        if (error) throw error;
        return data;
    }
}
