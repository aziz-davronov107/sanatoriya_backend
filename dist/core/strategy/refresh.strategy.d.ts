import { PrismaService } from '../db/prisma.service';
declare const RefreshJwtStrategy_base: new (...args: any) => any;
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: any): Promise<{
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        role: import(".prisma/client").$Enums.UserRole;
        avatar: string;
    }>;
}
export {};
