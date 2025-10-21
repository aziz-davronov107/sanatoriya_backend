import { PrismaService } from '../db/prisma.service';
declare const RefreshJwtStrategy_base: new (...args: any) => any;
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: any): Promise<{
        role: import(".prisma/client").$Enums.UserRole;
        id: number;
        email: string | null;
    }>;
}
export {};
