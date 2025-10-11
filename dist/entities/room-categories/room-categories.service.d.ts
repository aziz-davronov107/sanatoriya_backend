import { PrismaService } from 'src/core/db/prisma.service';
export declare class RoomCategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        title: string;
    }[]>;
}
