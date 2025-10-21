import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/db/prisma.service';
import { VerificationService } from '../verification/verification.service';
import { CreateDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private verificationService;
    constructor(prisma: PrismaService, jwtService: JwtService, verificationService: VerificationService);
    getToken(id: number, isTrue?: boolean): Promise<{
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
    refresh_token(id: number): Promise<{
        access_token: string;
        refresh_token: string;
    } | {
        access_token: string;
        refresh_token?: undefined;
    }>;
    isCheckPhone(data: {
        phone: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    } | {
        access_token: string;
        refresh_token?: undefined;
    } | null>;
    isCheckEmail(data: {
        email: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    } | {
        access_token: string;
        refresh_token?: undefined;
    } | null>;
    loginOrRegisterWithTelegram(telegramData: any): Promise<{
        access_token: string;
        refresh_token: string | undefined;
        user: {
            id: number;
            email: string | null;
            phone: string | null;
            telegramChatId: string | null;
        };
    }>;
}
