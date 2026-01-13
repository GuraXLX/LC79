const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create test vehicle
    const vehicle = await prisma.vehicle.create({
        data: {
            license_plate: 'PI-8344',
            vin: 'VIN123456789',
            nickname: 'BLAZE',
            model_type: 'Land Cruiser 79 Single Cab',
            odometer_km: 124500,
            assigned_driver_id: 'cc997efd-aa8d-4f1e-aad8-973fca2a4ee1', // Test Driver ID
        },
    });
    console.log('Created vehicle:', vehicle);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
