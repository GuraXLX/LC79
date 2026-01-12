import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './supabase/supabase.module';
import { OcrModule } from './ocr/ocr.module';
import { ServiceHorizonModule } from './service-horizon/service-horizon.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    OcrModule,
    ServiceHorizonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
