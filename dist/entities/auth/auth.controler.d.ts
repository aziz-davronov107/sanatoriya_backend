import { AuthService } from './auth.service';
import { CreateDto, LoginDto } from './dto/auth.dto';
import { Response } from 'express';
export declare class AuthControler {
    private readonly authService;
    constructor(authService: AuthService);
    me(req: any): any;
    register(data: CreateDto, res: Response): Promise<void>;
    login(res: Response, data: LoginDto): Promise<{
        access_token: string;
        refresh_token: string | undefined;
    }>;
    refresh_token(req: Request, res: Response): Promise<{
        access_token: string;
    }>;
}
