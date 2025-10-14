import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto, file: Express.Multer.File, req: any): Promise<{
        id: number;
        userId: number;
        description: string;
        url: string;
    }>;
    update(id: number, updateReviewDto: UpdateReviewDto, file: Express.Multer.File, req: any): Promise<{
        id: number;
        userId: number;
        description: string;
        url: string;
    }>;
    findOne(id: number): Promise<{
        id: number;
        userId: number;
        description: string;
        url: string;
    }>;
}
