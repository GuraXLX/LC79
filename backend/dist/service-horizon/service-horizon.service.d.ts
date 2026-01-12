import { SupabaseService } from '../supabase/supabase.service';
export declare class ServiceHorizonService {
    private supabaseService;
    private readonly logger;
    private readonly BASE_OIL_INTERVAL_KM;
    private readonly BASE_OIL_INTERVAL_HOURS;
    private readonly CORRUGATION_MULTIPLIER;
    constructor(supabaseService: SupabaseService);
    getEngineHealth(vehicleId: string): Promise<{
        oilLifePercent: number;
        status: string;
        msg: string;
        avgCorrugation?: undefined;
        kmSinceService?: undefined;
        predictedServiceDate?: undefined;
        daysRemaining?: undefined;
    } | {
        oilLifePercent: number;
        avgCorrugation: string;
        kmSinceService: number;
        predictedServiceDate: string;
        daysRemaining: number;
        status: string;
        msg?: undefined;
    }>;
}
