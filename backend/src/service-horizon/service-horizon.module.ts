import { Module } from '@nestjs/common';
import { ServiceHorizonController } from './service-horizon.controller';
import { ServiceHorizonService } from './service-horizon.service';

@Module({
    controllers: [ServiceHorizonController],
    providers: [ServiceHorizonService],
})
export class ServiceHorizonModule { }
