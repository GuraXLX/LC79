import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceLogDto } from './create-service-log.dto';

export class UpdateServiceLogDto extends PartialType(CreateServiceLogDto) {}
