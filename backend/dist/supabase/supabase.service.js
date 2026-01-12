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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
let SupabaseService = class SupabaseService {
    configService;
    supabase;
    constructor(configService) {
        this.configService = configService;
        const url = this.configService.get('SUPABASE_URL');
        const key = this.configService.get('SUPABASE_KEY');
        if (!url || !key) {
            throw new Error('SUPABASE_URL or SUPABASE_KEY is not defined');
        }
        this.supabase = (0, supabase_js_1.createClient)(url, key);
    }
    getClient() {
        return this.supabase;
    }
    async uploadImage(file, bucket) {
        const fileName = `${Date.now()}-${file.originalname}`;
        const { data, error } = await this.supabase.storage
            .from(bucket)
            .upload(fileName, file.buffer, {
            contentType: file.mimetype,
        });
        if (error)
            throw error;
        return data.path;
    }
};
exports.SupabaseService = SupabaseService;
exports.SupabaseService = SupabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SupabaseService);
//# sourceMappingURL=supabase.service.js.map