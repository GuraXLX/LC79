export class CreateServiceLogDto {
    vehicle_id: string;
    odometer: number;
    service_type: string;
    total_lkr: number;
    parts_source: string;
    invoice_url?: string;
    notes?: string;
    date?: string;
}
