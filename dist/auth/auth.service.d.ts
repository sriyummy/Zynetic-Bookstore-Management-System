import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signup(email: string, password: string): Promise<{
        message: string;
        userId: string;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
