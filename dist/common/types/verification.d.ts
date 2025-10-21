export declare enum EverifationsTypes {
    REGISTER = "register",
    EMAIL_PASSWORD = "reset_email",
    EDIT_PHONE = "edit_phone"
}
export interface ICheckOtp {
    type: EverifationsTypes;
    email: string;
    otp: string;
}
