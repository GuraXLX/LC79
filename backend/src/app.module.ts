import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { OcrModule } from './ocr/ocr.module';
import { ServiceHorizonModule } from './service-horizon/service-horizon.module';
import { FuelService } from './fuel/fuel.service';
import { TripService } from './trip/trip.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { FuelLogsModule } from './fuel-logs/fuel-logs.module';
import { ServiceLogsModule } from './service-logs/service-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    OcrModule,
    ServiceHorizonModule,
    VehiclesModule,
    UsersModule,
    PrismaModule,
    FuelLogsModule,
    ServiceLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, FuelService, TripService],
})
export class AppModule { }
