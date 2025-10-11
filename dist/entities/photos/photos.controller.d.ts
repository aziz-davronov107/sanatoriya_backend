import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
export declare class PhotosController {
    private readonly photosService;
    constructor(photosService: PhotosService);
    create(files: Express.Multer.File[], createPhotoDto: CreatePhotoDto): Promise<{
        message: string;
        count: number;
        items: {
            id: number;
            url: string;
            orderIndex: number;
            roomId: number;
        }[];
    }>;
    update(id: string, file?: Express.Multer.File): Promise<{
        message: string;
        item: {
            id: number;
            url: string;
            orderIndex: number;
            roomId: number;
        };
    }>;
}
