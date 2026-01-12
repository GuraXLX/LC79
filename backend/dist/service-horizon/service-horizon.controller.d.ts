import { ServiceHorizonService } from './service-horizon.service';
export declare class ServiceHorizonController {
    private readonly serviceHorizonService;
    constructor(serviceHorizonService: ServiceHorizonService);
    getHealth(vehicleId: string): Promise<{
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
