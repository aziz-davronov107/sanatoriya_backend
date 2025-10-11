import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/core/db/prisma.service';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createReviewDto: CreateReviewDto, url: string | undefined, userId: number): Promise<{
        description: string;
        url: string;
        id: number;
        userId: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        description: string;
        url: string;
        id: number;
        userId: number;
    }[]>;
    findOne(id: number): Promise<{
        description: string;
        url: string;
        id: number;
        userId: number;
    }>;
    update(id: number, updateReviewDto: UpdateReviewDto, url: string | undefined, userId: number): Promise<{
        description: string;
        url: string;
        id: number;
        userId: number;
    }>;
    remove(id: number): Promise<{
        description: string;
        url: string;
        id: number;
        userId: number;
    }>;
    private publicUrlToLocalPath;
}
