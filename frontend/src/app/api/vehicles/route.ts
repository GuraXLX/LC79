import { NextResponse } from 'next/server';

// In-memory vehicle store for standalone system
const VEHICLES = [
    {
        id: 'v1',
        nickname: 'BLAZE',
        license_plate: 'PI-8344',
        vin: 'VIN123456789',
        model_type: 'Land Cruiser 79 Single Cab',
        odometer_km: 124500,
        assigned_driver: {
            id: '3',
            name: 'Test Driver',
        },
        image: '/lc79_vehicle_1_1768283043519.png',
        status: 'ACTIVE',
    },
    {
        id: 'v2',
        nickname: 'IRON HIDE',
        license_plate: 'CAB-8821',
        vin: 'VIN987654321',
        model_type: 'Land Cruiser 79 Double Cab',
        odometer_km: 89200,
        assigned_driver: null,
        image: '/lc79_vehicle_2_1768283061431.png',
        status: 'ACTIVE',
    },
];

export async function GET() {
    return NextResponse.json(VEHICLES);
}
