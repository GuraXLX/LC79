import { Controller, Get, Param } from '@nestjs/common';
import { ServiceHorizonService } from './service-horizon.service';

@Controller('service-horizon')
export class ServiceHorizonController {
    constructor(private readonly serviceHorizonService: ServiceHorizonService) { }

    @Get(':vehicleId')
    async getHealth(@Param('vehicleId') vehicleId: string) {
        return this.serviceHorizonService.getEngineHealth(vehicleId);
    }
}
