import { CreatePhotoDto } from './dto/create-photo.dto';
import { PrismaService } from 'src/core/db/prisma.service';
export declare class PhotosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPhotoDto: CreatePhotoDto, imageUrls: string[]): Promise<{
        message: string;
        count: number;
        items: {
            id: number;
            url: string;
            orderIndex: number;
            roomId: number;
        }[];
    }>;
    update(id: number, url: string | undefined): Promise<{
        message: string;
        item: {
            id: number;
            url: string;
            orderIndex: number;
            roomId: number;
        };
    }>;
    private publicUrlToLocalPath;
}
