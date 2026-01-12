import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    // If no password provided, set a default placeholder
    const data = {
      ...createUserDto,
      password_hash: createUserDto.password || 'temp_hash_123',
    };
    delete (data as any).password; // Remove raw password field if it exists in DTO but not in DB

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password_hash: data.password_hash,
        role: data.role || 'OPERATOR',
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      orderBy: { created_at: 'desc' }
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        assigned_vehicles: true
      }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
