export class CreateModificationDto {
    vehicle_id: string;
    name: string;
    category: string;
    brand?: string;
    cost?: number;
    installed_at?: string;
    notes?: string;
}
