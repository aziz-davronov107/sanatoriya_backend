import { PrismaService } from 'src/core/db/prisma.service';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        img: string;
        iconImg: string;
    }[] | undefined>;
    findOne(id: number): Promise<string>;
    create(): Promise<string>;
    update(): Promise<string>;
    remove(): Promise<string>;
}
