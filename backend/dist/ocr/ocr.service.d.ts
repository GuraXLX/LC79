import { SupabaseService } from '../supabase/supabase.service';
export declare class OcrService {
    private supabaseService;
    private readonly logger;
    constructor(supabaseService: SupabaseService);
    processScan(file: Express.Multer.File, category: string, vehicleId: string, userId: string): Promise<any>;
    private performSimulatedOcr;
}
