import { VerificationService } from './verification.service';
import { SendOtpDto, VerifyOtpDto } from './dto/verification.dto';
export declare class VerificationController {
    private readonly verificationService;
    constructor(verificationService: VerificationService);
    sendOtp(body: SendOtpDto): Promise<{
        message: string;
    }>;
    verifyOtp(body: VerifyOtpDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
