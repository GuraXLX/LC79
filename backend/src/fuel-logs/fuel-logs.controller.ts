import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuelLogsService } from './fuel-logs.service';
import { CreateFuelLogDto } from './dto/create-fuel-log.dto';
import { UpdateFuelLogDto } from './dto/update-fuel-log.dto';

@Controller('fuel-logs')
export class FuelLogsController {
  constructor(private readonly fuelLogsService: FuelLogsService) { }

  @Post()
  create(@Body() createFuelLogDto: CreateFuelLogDto) {
    return this.fuelLogsService.create(createFuelLogDto);
  }

  @Get()
  findAll() {
    return this.fuelLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fuelLogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuelLogDto: UpdateFuelLogDto) {
    return this.fuelLogsService.update(id, updateFuelLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuelLogsService.remove(id);
  }
}
