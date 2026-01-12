export class CreateFuelLogDto {
    vehicle_id: string;
    odometer: number;
    liters: number;
    price_per_liter: number;
    total_lkr: number;
    fuel_type: string;
    station_name?: string;
    date?: string; // Optional, defaults to now() in backend if not provided
}
