import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class OcrService {
    private readonly logger = new Logger(OcrService.name);

    constructor(private supabaseService: SupabaseService) { }

    async processScan(file: Express.Multer.File, category: string, vehicleId: string, userId: string) {
        this.logger.log(`Processing ${category} scan for vehicle ${vehicleId}`);

        // 1. Upload to Supabase Storage
        const path = await this.supabaseService.uploadImage(file, 'v-eye-scans');
        const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/v-eye-scans/${path}`;

        // 2. Perform OCR (Simulated for this implementation)
        const { rawText, metadata } = await this.performSimulatedOcr(file, category);

        // 3. Save Record to DB
        const { data, error } = await this.supabaseService.getClient()
            .from('OCRRecord')
            .insert({
                vehicle_id: vehicleId,
                user_id: userId,
                category: category,
                image_url: imageUrl,
                raw_text: rawText,
                metadata: metadata,
                confidence_score: 0.95,
                sync_status: 'SYNCED',
                processed_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    private async performSimulatedOcr(file: Express.Multer.File, category: string) {
        // Logic to simulate parsing common Sri Lankan receipts
        if (category === 'FUEL_RECEIPT') {
            return {
                rawText: "CEYPETCO FUEL STATION\nCOLOMBO 07\nSUPER DIESEL\nLITERS: 40.00\nRATE: 380.00\nTOTAL: 15200.00",
                metadata: {
                    total_lkr: 15200.00,
                    liters: 40.0,
                    fuel_type: 'SUPER DIESEL',
                    station: 'CEYPETCO - COLOMBO 07'
                }
            };
        }

        return {
            rawText: "Sample OCR content for " + category,
            metadata: {}
        };
    }
}
