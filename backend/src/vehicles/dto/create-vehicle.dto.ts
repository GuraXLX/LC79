export class CreateVehicleDto {
    nickname?: string;
    vin: string;
    license_plate: string;
    model_type: string;
    gvm_limit_kg?: number;
    curb_weight_kg?: number;
    assigned_driver_id?: string;
}
