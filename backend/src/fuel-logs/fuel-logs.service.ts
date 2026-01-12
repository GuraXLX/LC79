import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFuelLogDto } from './dto/create-fuel-log.dto';
import { UpdateFuelLogDto } from './dto/update-fuel-log.dto';

@Injectable()
export class FuelLogsService {
  constructor(private prisma: PrismaService) { }

  async create(createFuelLogDto: CreateFuelLogDto) {
    const log = await this.prisma.fuelLog.create({
      data: {
        ...createFuelLogDto,
        date: createFuelLogDto.date ? new Date(createFuelLogDto.date) : new Date(),
      },
    });

    // Update Vehicle Odometer if this new log has a higher reading
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: createFuelLogDto.vehicle_id } });
    if (vehicle && createFuelLogDto.odometer > vehicle.odometer_km) {
      await this.prisma.vehicle.update({
        where: { id: vehicle.id },
        data: { odometer_km: createFuelLogDto.odometer }
      });
    }

    return log;
  }

  async findAll() {
    return this.prisma.fuelLog.findMany({
      include: { vehicle: true },
      orderBy: { date: 'desc' }
    });
  }

  // ... (Other standard CRUD methods unimplemented for now)
  findOne(id: string) { return `This action returns a #${id} fuelLog`; }
  update(id: string, updateFuelLogDto: UpdateFuelLogDto) { return `This action updates a #${id} fuelLog`; }
  remove(id: string) { return `This action removes a #${id} fuelLog`; }
}
