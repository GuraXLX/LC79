const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Create admin user
    const admin = await prisma.user.create({
        data: {
            email: 'admin@tuff79.lk',
            name: 'Admin User',
            password_hash: 'temp_hash_123',
            role: 'COMMANDER',
        },
    });
    console.log('Created admin:', admin);

    // Create test driver
    const driver = await prisma.user.create({
        data: {
            email: 'driver@tuff79.lk',
            name: 'Test Driver',
            password_hash: 'temp_hash_123',
            role: 'OPERATOR',
        },
    });
    console.log('Created driver:', driver);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
