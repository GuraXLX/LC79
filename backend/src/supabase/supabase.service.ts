import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor(private configService: ConfigService) {
        const url = this.configService.get<string>('SUPABASE_URL');
        const key = this.configService.get<string>('SUPABASE_KEY');
        this.supabase = createClient(url, key);
    }

    getClient() {
        return this.supabase;
    }

    async uploadImage(file: Express.Multer.File, bucket: string) {
        const fileName = `${Date.now()}-${file.originalname}`;
        const { data, error } = await this.supabase.storage
            .from(bucket)
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) throw error;
        return data.path;
    }
}
