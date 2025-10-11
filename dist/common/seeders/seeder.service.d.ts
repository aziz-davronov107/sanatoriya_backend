import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/core/db/prisma.service';
export declare class SeederService implements OnModuleInit {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    seed(): Promise<void>;
}
