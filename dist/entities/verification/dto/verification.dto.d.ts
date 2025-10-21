import { EverifationsTypes } from 'src/common/types/verification';
export declare const LimitedVerificationTypes: {
    readonly REGISTER: EverifationsTypes.REGISTER;
    readonly EMAIL_PASSWORD: EverifationsTypes.EMAIL_PASSWORD;
};
export declare class SendOtpDto {
    type: EverifationsTypes;
    email: string;
}
export declare class VerifyOtpDto extends SendOtpDto {
    otp: string;
}
