import { ProfileService } from './profile.service';
import { UpdateProfileDto, UpdatePasswordDto } from './dto/profile.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        role: import(".prisma/client").$Enums.UserRole;
        password: string;
        avatar: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateProfile(req: any, dto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        role: import(".prisma/client").$Enums.UserRole;
        password: string;
        avatar: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePassword(req: any, dto: UpdatePasswordDto): Promise<{
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        role: import(".prisma/client").$Enums.UserRole;
        password: string;
        avatar: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateAvatar(req: any, file: Express.Multer.File): Promise<{
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        role: import(".prisma/client").$Enums.UserRole;
        password: string;
        avatar: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
