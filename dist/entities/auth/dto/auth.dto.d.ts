export declare enum UserRoleDto {
    SALER = "SALER",
    USER = "USER"
}
export declare class CreateDto {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    otp: string;
    role: UserRoleDto;
}
export declare class LoginDto {
    email: string;
    password: string;
}
