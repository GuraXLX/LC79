"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OcrService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcrService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let OcrService = OcrService_1 = class OcrService {
    supabaseService;
    logger = new common_1.Logger(OcrService_1.name);
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async processScan(file, category, vehicleId, userId) {
        this.logger.log(`Processing ${category} scan for vehicle ${vehicleId}`);
        const path = await this.supabaseService.uploadImage(file, 'v-eye-scans');
        const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/v-eye-scans/${path}`;
        const { rawText, metadata } = await this.performSimulatedOcr(file, category);
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
        if (error)
            throw error;
        return data;
    }
    async performSimulatedOcr(file, category) {
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
};
exports.OcrService = OcrService;
exports.OcrService = OcrService = OcrService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], OcrService);
//# sourceMappingURL=ocr.service.js.map