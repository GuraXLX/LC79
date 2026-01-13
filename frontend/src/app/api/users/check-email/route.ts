import { NextResponse } from 'next/server';

// In-memory user store for standalone system
const USERS = [
    {
        id: '1',
        email: 'kushan@tuff79.com',
        name: 'Kushan',
        role: 'COMMANDER',
    },
    {
        id: '2',
        email: 'admin@tuff79.lk',
        name: 'Admin User',
        role: 'COMMANDER',
    },
    {
        id: '3',
        email: 'driver@tuff79.lk',
        name: 'Test Driver',
        role: 'OPERATOR',
    },
];

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        const user = USERS.find(u => u.email === email);

        if (user) {
            return NextResponse.json({
                found: true,
                role: user.role,
                id: user.id,
                name: user.name,
            });
        }

        return NextResponse.json({ found: false });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
