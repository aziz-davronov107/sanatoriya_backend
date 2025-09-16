export declare class EmailService {
    private transporter;
    constructor();
    sendOtpCode(to: string, otp: string): Promise<void>;
}
