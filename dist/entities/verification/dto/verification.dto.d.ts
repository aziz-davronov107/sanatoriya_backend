export declare enum LimitedVerificationTypes {
    REGISTER = "register",
    EMAIL_PASSWORD = "reset_email"
}
export declare class SendOtpDto {
    type: LimitedVerificationTypes;
    email: string;
}
export declare class VerifyOtpDto extends SendOtpDto {
    otp: string;
}
