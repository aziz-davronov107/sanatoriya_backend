import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto, file: Express.Multer.File, req: any): Promise<{
        description: string;
        url: string;
        id: number;
        userId: number;
    }>;
    update(id: number, updateReviewDto: UpdateReviewDto, file: Express.Multer.File, req: any): Promise<{
        description: string;
        url: string;
        id: number;
        userId: number;
    }>;
    findOne(id: number): Promise<{
        description: string;
        url: string;
        id: number;
        userId: number;
    }>;
}
