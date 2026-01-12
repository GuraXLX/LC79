import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceLogsService } from './service-logs.service';
import { CreateServiceLogDto } from './dto/create-service-log.dto';
import { UpdateServiceLogDto } from './dto/update-service-log.dto';

@Controller('service-logs')
export class ServiceLogsController {
  constructor(private readonly serviceLogsService: ServiceLogsService) { }

  @Post()
  create(@Body() createServiceLogDto: CreateServiceLogDto) {
    return this.serviceLogsService.create(createServiceLogDto);
  }

  @Get()
  findAll() {
    return this.serviceLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceLogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceLogDto: UpdateServiceLogDto) {
    return this.serviceLogsService.update(id, updateServiceLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceLogsService.remove(id);
  }
}
