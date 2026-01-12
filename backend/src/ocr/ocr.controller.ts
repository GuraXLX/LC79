import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
    constructor(private readonly ocrService: OcrService) { }

    @Post('scan')
    @UseInterceptors(FileInterceptor('file'))
    async uploadScan(
        @UploadedFile() file: Express.Multer.File,
        @Body('category') category: string,
        @Body('vehicleId') vehicleId: string,
        @Body('userId') userId: string,
    ) {
        return this.ocrService.processScan(file, category, vehicleId, userId);
    }
}
