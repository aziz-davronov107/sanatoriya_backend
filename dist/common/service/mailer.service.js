"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
function bool(v, def = false) {
    if (v === undefined)
        return def;
    return String(v).toLowerCase() === 'true';
}
let EmailService = class EmailService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT ?? 587),
            secure: bool(process.env.SMTP_SECURE, false),
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    async sendOtpCode(to, otp) {
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
        }
        catch (err) {
            console.log('EMAIL ERROR:', err);
            throw new common_1.InternalServerErrorException('Email yuborishda xatolik yuz berdi');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=mailer.service.js.map