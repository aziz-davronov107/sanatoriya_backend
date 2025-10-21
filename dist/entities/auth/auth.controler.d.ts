import { AuthService } from './auth.service';
import { CreateDto } from './dto/auth.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import { CheckPhoneDto } from './dto/check-phone.dto';
import { Response } from 'express';
export declare class AuthControler {
    private readonly authService;
    constructor(authService: AuthService);
    me(req: any): any;
    register(data: CreateDto, res: Response): Promise<{
        access_token: string;
        refresh_token: string;
    } | {
        access_token: string;
        refresh_token?: undefined;
    }>;
    refresh_token(req: Request, res: Response): Promise<{
        access_token: string;
    }>;
    isCheckPhone(data: CheckPhoneDto, res: Response): Promise<{
        access_token: string;
        refresh_token: string;
    } | {
        access_token: string;
        refresh_token?: undefined;
    } | null>;
    isCheckEmail(data: CheckEmailDto, res: Response): Promise<{
        access_token: string;
        refresh_token: string;
    } | {
        access_token: string;
        refresh_token?: undefined;
    } | null>;
    telegramLogin(res: Response): Promise<void>;
    telegramCallback(req: any, res: Response): Promise<void>;
}
