import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceLogDto } from './dto/create-service-log.dto';
import { UpdateServiceLogDto } from './dto/update-service-log.dto';

@Injectable()
export class ServiceLogsService {
  constructor(private prisma: PrismaService) { }

  async create(createServiceLogDto: CreateServiceLogDto) {
    const log = await this.prisma.serviceLog.create({
      data: {
        ...createServiceLogDto,
        date: createServiceLogDto.date ? new Date(createServiceLogDto.date) : new Date(),
      },
    });

    // Update Vehicle Odometer logic (same as FuelLog)
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: createServiceLogDto.vehicle_id } });
    if (vehicle && createServiceLogDto.odometer > vehicle.odometer_km) {
      await this.prisma.vehicle.update({
        where: { id: vehicle.id },
        data: { odometer_km: createServiceLogDto.odometer }
      });
    }

    return log;
  }

  async findAll() {
    return this.prisma.serviceLog.findMany({
      include: { vehicle: true },
      orderBy: { date: 'desc' }
    });
  }

  // ... (Other standard CRUD methods unimplemented for now)
  findOne(id: string) { return `This action returns a #${id} serviceLog`; }
  update(id: string, updateServiceLogDto: UpdateServiceLogDto) { return `This action updates a #${id} serviceLog`; }
  remove(id: string) { return `This action removes a #${id} serviceLog`; }
}
