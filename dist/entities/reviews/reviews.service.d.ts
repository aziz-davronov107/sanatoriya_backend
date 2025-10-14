import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/core/db/prisma.service';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createReviewDto: CreateReviewDto, url: string | undefined, userId: number): Promise<{
        id: number;
        userId: number;
        description: string;
        url: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        userId: number;
        description: string;
        url: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        userId: number;
        description: string;
        url: string;
    }>;
    update(id: number, updateReviewDto: UpdateReviewDto, url: string | undefined, userId: number): Promise<{
        id: number;
        userId: number;
        description: string;
        url: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        userId: number;
        description: string;
        url: string;
    }>;
    private publicUrlToLocalPath;
}
