import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/core/db/prisma.service';
export declare class ProfilesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        userId: number;
        role: import(".prisma/client").$Enums.UserRole;
        imageUrl: string | null;
        fullName: string | null;
        address: string | null;
        isDisabled: boolean | null;
    }[]>;
    findOne(userId: number): Promise<{
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
    update(id: number, updateProfileDto: UpdateProfileDto, imageUrl?: string): Promise<{
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
    private publicUrlToLocalPath;
}
