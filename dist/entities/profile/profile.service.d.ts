import { PrismaService } from 'src/core/db/prisma.service';
import { UpdatePasswordDto, UpdateProfileDto } from './dto/profile.dto';
import { VerificationService } from '../verification/verification.service';
import { User } from '@prisma/client';
export declare class ProfileService {
    private readonly prisma;
    private readonly verificationService;
    constructor(prisma: PrismaService, verificationService: VerificationService);
    getProfile(id: string): Promise<{
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
    updateProfile(id: string, dto: UpdateProfileDto): Promise<{
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
    updatePassword(user: User, dto: UpdatePasswordDto): Promise<{
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
    updateAvatar(id: string, avatarUrl: string): Promise<{
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
