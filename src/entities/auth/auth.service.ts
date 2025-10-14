import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/db/prisma.service';
import { VerificationService } from '../verification/verification.service';
import * as bcrypt from 'bcrypt';
import { CreateDto, LoginDto } from './dto/auth.dto';
import { EverifationsTypes } from 'src/common/types/verification';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private verificationService: VerificationService,
  ) {}
  async getToken(id: number, isTrue?: boolean) {
    let isRefresh = {
      secret: process.env.JWT_REFRESH_SECRET || 'yandiev',
      expiresIn: '7d',
    };
    if (!isTrue) {
      return {
        access_token: await this.jwtService.signAsync({ id }),
        refresh_token: await this.jwtService.signAsync({ id }, isRefresh),
      };
    }
    return {
      access_token: await this.jwtService.signAsync({ id }),
    };
  }

  async register(payload: CreateDto) {
    const { email, otp } = payload;
    await this.verificationService.checkConfigOtp({
      email,
      type: EverifationsTypes.REGISTER,
      otp,
    });
    const exists = await this.prisma.user.findUnique({
      where: { email },
    });
    if (exists) {
      throw new ConflictException('User already exists');
    }
    const new_user = await this.prisma.user.create({
      data: {
        email,
      },
    });

    const profile = await this.prisma.profile.create({
      data: {
        role: UserRole.USER,
        userId: new_user.id,
      },
    });

    const token = await this.getToken(new_user.id);
    console.log(token);
    return token;
  }

  async login(payload: LoginDto) {
    const { email, otp } = payload;
    await this.verificationService.checkConfigOtp({email,type:EverifationsTypes.LOGIN,otp})
    let user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user) {
      throw new ConflictException('User not Found!');
    }
    const profile = await this.prisma.profile.findUnique({
      where: { userId: user.id, isDisabled: false },
    });
    if (!profile) {
      throw new ConflictException('Profile not Found!');
    }
    const token = await this.getToken(user.id);
    return token;
  }
  async refresh_token(id: number) {
    const token = await this.getToken(id, true);
    return token;
  }
}
