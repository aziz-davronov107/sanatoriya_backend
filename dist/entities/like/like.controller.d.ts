import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    findAll(): Promise<string>;
    findOne(id: number): Promise<string>;
    create(dto: LikeDto): Promise<string>;
    update(id: number, dto: LikeDto): Promise<string>;
    remove(id: number): Promise<string>;
}
