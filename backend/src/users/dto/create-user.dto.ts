import { Role } from '@prisma/client';

export class CreateUserDto {
    email: string;
    name: string;
    password?: string; // Optional for now, or auto-generated
    role?: Role;
}
