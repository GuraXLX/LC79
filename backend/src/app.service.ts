import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return { status: 'operational', system: 'LC79 VMS API', version: '1.0.0' };
  }
}
