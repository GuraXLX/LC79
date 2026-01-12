import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateModificationDto } from './dto/create-modification.dto';
import { UpdateModificationDto } from './dto/update-modification.dto';

@Injectable()
export class ModificationsService {
  constructor(private prisma: PrismaService) { }

  async create(createModificationDto: CreateModificationDto) {
    return this.prisma.modification.create({
      data: {
        vehicle_id: createModificationDto.vehicle_id,
        name: createModificationDto.name,
        category: createModificationDto.category,
        brand: createModificationDto.brand,
        cost: createModificationDto.cost || 0,
        installed_at: createModificationDto.installed_at ? new Date(createModificationDto.installed_at) : null,
        notes: createModificationDto.notes,
      },
    });
  }

  async findAll(vehicleId?: string) {
    return this.prisma.modification.findMany({
      where: vehicleId ? { vehicle_id: vehicleId } : {},
      orderBy: { installed_at: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.modification.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateModificationDto: UpdateModificationDto) {
    return this.prisma.modification.update({
      where: { id },
      data: updateModificationDto,
    });
  }

  async remove(id: string) {
    return this.prisma.modification.delete({
      where: { id },
    });
  }
}
