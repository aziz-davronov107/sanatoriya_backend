import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/db/prisma.service';
import { VerificationService } from '../verification/verification.service';
import { CreateDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private verificationService;
    constructor(prisma: PrismaService, jwtService: JwtService, verificationService: VerificationService);
    getToken(id: string, isTrue?: boolean): Promise<{
        access_token: string;
        refresh_token: string;
    } | {
        access_token: string;
        refresh_token?: undefined;
    }>;
    register(payload: CreateDto): Promise<{
        access_token: string;
        refresh_token: string;
    } | {
        access_token: string;
        refresh_token?: undefined;
    }>;
    login(payload: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
    } | {
        access_token: string;
        refresh_token?: undefined;
    }>;
    refresh_token(id: string): Promise<{
        access_token: string;
        refresh_token: string;
    } | {
        access_token: string;
        refresh_token?: undefined;
    }>;
}
