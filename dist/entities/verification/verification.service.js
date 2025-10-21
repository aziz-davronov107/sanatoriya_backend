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
exports.VerificationService = void 0;
const common_1 = require("@nestjs/common");
const verification_1 = require("../../common/types/verification");
const prisma_service_1 = require("../../core/db/prisma.service");
const redis_service_1 = require("../../common/redis/redis.service");
const mailer_service_1 = require("../../common/service/mailer.service");
const random_1 = require("../../common/utils/random");
let VerificationService = class VerificationService {
    prisma;
    emailService;
    redis;
    constructor(prisma, emailService, redis) {
        this.prisma = prisma;
        this.emailService = emailService;
        this.redis = redis;
    }
    subject(type) {
        const subjects = {
            [verification_1.EverifationsTypes.REGISTER]: 'Ro‘yxatdan o‘tish tasdiqlash kodi',
            [verification_1.EverifationsTypes.EMAIL_PASSWORD]: 'Parolni tiklash kodi',
            [verification_1.EverifationsTypes.EDIT_PHONE]: 'Telefonni yangilash tasdiqlash kodi',
        };
        return subjects[type];
    }
    textMessage(_type, otp) {
        return `Tasdiqlash kodi: ${otp}. Ushbu kodni hech kimga bermang.`;
    }
    htmlMessage(_type, otp) {
        return `
      <div style="font-family: Arial, sans-serif; line-height:1.6">
        <h2>OTP</h2>
        <p>Quyidagi tasdiqlash kodini kiriting:</p>
        <div style="font-size:24px; font-weight:700; letter-spacing:4px;">
          ${otp}
        </div>
        <p style="color:#666">Kod 5 daqiqa ichida amal qiladi. Hech kimga bermang.</p>
      </div>
    `;
    }
    async throwIfUserExists(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user)
            throw new common_1.HttpException('Email already used', common_1.HttpStatus.BAD_REQUEST);
        return user;
    }
    async throwIfUserNotExists(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new common_1.HttpException('User not found!', common_1.HttpStatus.BAD_REQUEST);
        return user;
    }
    getKey(type, email, confirmation) {
        const storeKeys = {
            [verification_1.EverifationsTypes.REGISTER]: 'reg_',
            [verification_1.EverifationsTypes.EMAIL_PASSWORD]: 'respass_',
            [verification_1.EverifationsTypes.EDIT_PHONE]: 'editphone_',
        };
        let key = storeKeys[type];
        if (confirmation)
            key += 'cfm_';
        key += email.toLowerCase();
        return key;
    }
    async sendOtp(payload) {
        const { type, email } = payload;
        const key = this.getKey(type, email);
        const session = await this.redis.get(key);
        if (session) {
            throw new common_1.HttpException('Code already sent to user', common_1.HttpStatus.BAD_REQUEST);
        }
        switch (type) {
            case verification_1.EverifationsTypes.REGISTER:
                await this.throwIfUserExists(email);
                break;
            case verification_1.EverifationsTypes.EMAIL_PASSWORD:
                await this.throwIfUserNotExists(email);
                break;
        }
        const otp = (0, random_1.generateOtp)();
        await this.redis.set(key, JSON.stringify({ otp }), 300);
        const subject = this.subject(type);
        const text = this.textMessage(type, otp);
        const html = this.htmlMessage(type, otp);
        await this.emailService.sendOtpCode(email, otp);
        return { message: 'Confirmation code sent!' };
    }
    async verifyOtp(payload) {
        const { type, email, otp } = payload;
        const pendingKey = this.getKey(type, email);
        const session = await this.redis.get(pendingKey);
        if (!session) {
            throw new common_1.HttpException('OTP expired!', common_1.HttpStatus.BAD_REQUEST);
        }
        if (otp !== JSON.parse(session).otp) {
            throw new common_1.HttpException('Invalid OTP', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.redis.delete(pendingKey);
        await this.redis.set(this.getKey(type, email, true), JSON.stringify({ otp }), 600);
        return { success: true, message: 'Verified' };
    }
    async checkConfigOtp(payload) {
        const { type, email, otp } = payload;
        const confirmKey = this.getKey(type, email, true);
        const session = await this.redis.get(confirmKey);
        if (!session) {
            throw new common_1.HttpException('OTP expired!', common_1.HttpStatus.BAD_REQUEST);
        }
        if (otp !== JSON.parse(session).otp) {
            throw new common_1.HttpException('Invalid OTP', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.redis.delete(confirmKey);
        return true;
    }
};
exports.VerificationService = VerificationService;
exports.VerificationService = VerificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_service_1.EmailService,
        redis_service_1.MyRedisService])
], VerificationService);
//# sourceMappingURL=verification.service.js.map