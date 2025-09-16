import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/db/prisma.service';
import { VerificationService } from '../verification/verification.service';
import * as bcrypt from 'bcrypt';
import { CreateDto, LoginDto } from './dto/auth.dto';
import { EverifationsTypes } from 'src/common/types/verification';


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private verificationService: VerificationService,
  ) {}
  async getToken(id: string, isTrue?: boolean) {
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
    await this.verificationService.checkConfigOtp({
      type: EverifationsTypes.REGISTER,
      gmail: payload.email, // ICheckOtp uchun
      otp: payload.otp,
      email: payload.email,
    });

    let { email, password, firstname, lastname } = payload;
    const exists = await this.prisma.user.findUnique({
      where: { email },
    });
    if (exists) {
      throw new ConflictException('User already exists');
    }
    let hash = await bcrypt.hash(password, 10);
    const new_user = await this.prisma.user.create({
      data: {
        email,
        password: hash,
        firstname,
        lastname,
        role: 'USER',
        avatar: '',
      },
    });

    const token = await this.getToken(new_user.id);
    console.log(token)
    return token;
  }

  async login(payload: LoginDto) {
    let user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!user || !(await bcrypt.compare(payload.password, user.password))) {
      throw new HttpException(
        'Email or password incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.getToken(user.id);
    return token;
  }
  async refresh_token(id: string) {
    const token = await this.getToken(id, true);
    return token;
  }
}
