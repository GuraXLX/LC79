export class CreateUserDto {
    email: string;
    name: string;
    password?: string; // Optional for now, or auto-generated
    role?: 'COMMANDER' | 'OPERATOR';
}
