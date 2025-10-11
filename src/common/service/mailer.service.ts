import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

function bool(v: string | undefined, def = false) {
  if (v === undefined) return def;
  return String(v).toLowerCase() === 'true';
}

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: bool(process.env.SMTP_SECURE, false), // 465=true, 587/25=false
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * OTP yuborish uchun soddalashtirilgan method.
   * @param to qabul qiluvchi email
   * @param otp tasdiqlash kodi
   */
  async sendOtpCode(to: string, otp: string) {
    const subject = 'OTP Code';
    const text = `Your OTP code: ${otp}`;
    const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.6">
        <h2>OTP Code</h2>
        <p>Quyidagi tasdiqlash kodini kiriting:</p>
        <div style="font-size:24px; font-weight:700; letter-spacing:4px;">
          ${otp}
        </div>
        <p style="color:#666">Kod 2 daqiqa ichida amal qiladi. Hech kimga bermang.</p>
      </div>
    `;

    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM ?? `"OTP Code" <no-reply@example.com>`,
        to,
        subject,
        text,
        html,
      });
    } catch (err) {
      console.log('EMAIL ERROR:', err);
      throw new InternalServerErrorException(
        'Email yuborishda xatolik yuz berdi',
      );
    }
  }
}
