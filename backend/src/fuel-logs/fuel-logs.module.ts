import { Module } from '@nestjs/common';
import { FuelLogsService } from './fuel-logs.service';
import { FuelLogsController } from './fuel-logs.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FuelLogsController],
  providers: [FuelLogsService],
})
export class FuelLogsModule { }
