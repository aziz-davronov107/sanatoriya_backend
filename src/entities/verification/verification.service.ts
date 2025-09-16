// src/modules/verification/verification.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendOtpDto, VerifyOtpDto, LimitedVerificationTypes } from './dto/verification.dto';
import { EverifationsTypes, ICheckOtp } from 'src/common/types/verification';
import { PrismaService } from 'src/core/db/prisma.service';
import { MyRedisService } from 'src/common/redis/redis.service';
import { EmailService } from 'src/common/service/mailer.service'; // ← senda shu yo'l bo'lsa
import { generateOtp } from 'src/common/utils/random';

@Injectable()
export class VerificationService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private redis: MyRedisService,
  ) {}

  private subject(type: EverifationsTypes) {
    const subjects: Record<EverifationsTypes, string> = {
      [EverifationsTypes.REGISTER]: 'Ro‘yxatdan o‘tish tasdiqlash kodi',
      [EverifationsTypes.EMAIL_PASSWORD]: 'Parolni tiklash kodi',
      [EverifationsTypes.EDIT_PHONE]: '', // Agar kerak bo'lmasa, olib tashlang yoki bo'sh qoldiring
    };
    return subjects[type];
  }

  private textMessage(_type: EverifationsTypes, otp: string) {
    return `Tasdiqlash kodi: ${otp}. Ushbu kodni hech kimga bermang.`;
  }

  private htmlMessage(_type: EverifationsTypes, otp: string) {
    return `
      <div style="font-family: Arial, sans-serif; line-height:1.6">
        <h2>OTP</h2>
        <p>Quyidagi tasdiqlash kodini kiriting:</p>
        <div style="font-size:24px; font-weight:700; letter-spacing:4px;">
          ${otp}
        </div>
        <p style="color:#666">Kod 2 daqiqa ichida amal qiladi. Hech kimga bermang.</p>
      </div>
    `;
  }

  private async throwIfUserExists(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) throw new HttpException('Email already used', HttpStatus.BAD_REQUEST);
    return user;
  }

  private async throwIfUserNotExists(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
    return user;
  }

  public getKey(type: EverifationsTypes, email: string, confirmation?: boolean) {
    const storeKeys: Record<EverifationsTypes, string> = {
      [EverifationsTypes.REGISTER]: 'reg_',
      [EverifationsTypes.EMAIL_PASSWORD]: 'respass_',
      [EverifationsTypes.EDIT_PHONE]: '', // Agar kerak bo'lmasa, olib tashlang yoki bo'sh qoldiring
    };
    let key = storeKeys[type];
    if (confirmation) key += 'cfm_';
    key += email.toLowerCase();
    return key;
  }

  async sendOtp(payload: SendOtpDto) {
    const { type, email } = payload;
  const typeEnum = type as unknown as EverifationsTypes;
    const key = this.getKey(typeEnum, email);

    const session = await this.redis.get(key);
    if (session) {
      throw new HttpException('Code already sent to user', HttpStatus.BAD_REQUEST);
    }

    switch (typeEnum) {
      case EverifationsTypes.REGISTER:
        await this.throwIfUserExists(email);
        break;
      case EverifationsTypes.EMAIL_PASSWORD:
        await this.throwIfUserNotExists(email);
        break;
    }

    const otp = generateOtp();
    await this.redis.set(key, JSON.stringify({ otp }), 300);

    const subject = this.subject(typeEnum);
    const text = this.textMessage(typeEnum, otp);
    const html = this.htmlMessage(typeEnum, otp);

    // EmailService sendMail metodini tekshiring, agar nomi boshqacha bo'lsa, shu yerda to'g'rilang
  // await this.emailService.sendMail(email, subject, text, html);
  await this.emailService.sendOtpCode(email, otp);

    return { message: 'Confirmation code sent!' };
  }

  async verifyOtp(payload: VerifyOtpDto) {
    const { type, email, otp } = payload;
  const typeEnum = type as unknown as EverifationsTypes;
    const pendingKey = this.getKey(typeEnum, email);
    const session = await this.redis.get(pendingKey);
    if (!session) {
      throw new HttpException('OTP expired!', HttpStatus.BAD_REQUEST);
    }
    if (otp !== JSON.parse(session).otp) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }

    await this.redis.delete(pendingKey);
    await this.redis.set(this.getKey(typeEnum, email, true), JSON.stringify({ otp }), 600);

    return { success: true, message: 'Verified' };
  }

  public async checkConfigOtp(payload: ICheckOtp & { email: string }) {
    const { type, email, otp } = payload;
    const typeEnum = type as EverifationsTypes;
    const confirmKey = this.getKey(typeEnum, email, true);
    const session = await this.redis.get(confirmKey);
    if (!session) {
      throw new HttpException('OTP expired!', HttpStatus.BAD_REQUEST);
    }
    if (otp !== JSON.parse(session).otp) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }
    await this.redis.delete(confirmKey);
    return true;
  }
}
