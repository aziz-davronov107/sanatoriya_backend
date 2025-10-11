import { SendOtpDto, VerifyOtpDto } from './dto/verification.dto';
import { EverifationsTypes } from 'src/common/types/verification';
import { PrismaService } from 'src/core/db/prisma.service';
import { MyRedisService } from 'src/common/redis/redis.service';
import { EmailService } from 'src/common/service/mailer.service';
export declare class VerificationService {
    private prisma;
    private emailService;
    private redis;
    constructor(prisma: PrismaService, emailService: EmailService, redis: MyRedisService);
    private subject;
    private textMessage;
    private htmlMessage;
    private throwIfUserExists;
    private throwIfUserNotExists;
    getKey(type: EverifationsTypes, email: string, confirmation?: boolean): string;
    sendOtp(payload: SendOtpDto): Promise<{
        message: string;
    }>;
    verifyOtp(payload: VerifyOtpDto): Promise<{
        success: boolean;
        message: string;
    }>;
    checkConfigOtp(payload: {
        type: EverifationsTypes;
        email: string;
        otp: string;
    }): Promise<boolean>;
}
