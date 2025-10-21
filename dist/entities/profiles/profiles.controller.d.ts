import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    findAll(): Promise<{
        id: number;
        userId: number;
        role: import(".prisma/client").$Enums.UserRole;
        imageUrl: string | null;
        fullName: string | null;
        address: string | null;
        isDisabled: boolean | null;
    }[]>;
    findOne(req: any): Promise<{
        user: {
            reviews: {
                id: number;
                userId: number;
                description: string;
                url: string;
            }[];
            id?: number | undefined;
            email?: string | null | undefined;
            phone?: string | null | undefined;
            telegramChatId?: string | null | undefined;
        };
        id: number;
        userId: number;
        role: import(".prisma/client").$Enums.UserRole;
        imageUrl: string | null;
        fullName: string | null;
        address: string | null;
        isDisabled: boolean | null;
    } | null>;
    update(req: any, updateProfileDto: UpdateProfileDto, file?: Express.Multer.File): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        userId: number;
        role: import(".prisma/client").$Enums.UserRole;
        imageUrl: string | null;
        fullName: string | null;
        address: string | null;
        isDisabled: boolean | null;
    }>;
}
