import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/db/prisma.service';
import { UpdatePasswordDto, UpdateProfileDto } from './dto/profile.dto';
import { VerificationService } from '../verification/verification.service';
import { EverifationsTypes } from 'src/common/types/verification';
import { User } from '@prisma/client';
import * as bgcrypt from 'bcrypt';

@Injectable()
export class ProfileService {
    constructor( private readonly prisma : PrismaService, private readonly  verificationService:VerificationService) {}
    async getProfile(id: string) {
        return await  this.prisma.user.findUnique({where: {id} });
    }
    async updateProfile(id:string, dto:UpdateProfileDto) {
        return await this.prisma.user.update({
            where: {id},
            data: dto
        });
    }
    async updatePassword(user: User, dto:UpdatePasswordDto) {

        await this.verificationService.checkConfigOtp({
              type: EverifationsTypes.EMAIL_PASSWORD,
              gmail: user.email, // ICheckOtp uchun
              otp: dto.otp,
              email: user.email,
        });
        let hash = bgcrypt.hashSync(dto.newPassword, 10);
        let new_profile = await this.prisma.user.update({
            where: {id:user.id},
            data: {password:hash}
        });
        return new_profile;
    }      
    async updateAvatar(id:string, avatarUrl: string) {
        return await this.prisma.user.update({
            where: {id},
            data: {avatar: avatarUrl}
        });
    }
}
