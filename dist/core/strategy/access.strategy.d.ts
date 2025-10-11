import { PrismaService } from '../db/prisma.service';
declare const AccessJwtStrategy_base: new (...args: any) => any;
export declare class AccessJwtStrategy extends AccessJwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: any): Promise<{
        role: import(".prisma/client").$Enums.UserRole;
        id: number;
        email: string;
    }>;
}
export {};
