import { OcrService } from './ocr.service';
export declare class OcrController {
    private readonly ocrService;
    constructor(ocrService: OcrService);
    uploadScan(file: Express.Multer.File, category: string, vehicleId: string, userId: string): Promise<any>;
}
