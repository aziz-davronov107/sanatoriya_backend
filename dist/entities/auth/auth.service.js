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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../core/db/prisma.service");
const verification_service_1 = require("../verification/verification.service");
const verification_1 = require("../../common/types/verification");
const client_1 = require("@prisma/client");
let AuthService = class AuthService {
    prisma;
    jwtService;
    verificationService;
    constructor(prisma, jwtService, verificationService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.verificationService = verificationService;
    }
    async getToken(id, isTrue) {
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
    async register(payload) {
        const { email, otp } = payload;
        await this.verificationService.checkConfigOtp({
            email,
            type: verification_1.EverifationsTypes.REGISTER,
            otp,
        });
        const exists = await this.prisma.user.findUnique({
            where: { email },
        });
        if (exists) {
            throw new common_1.ConflictException('User already exists');
        }
        const new_user = await this.prisma.user.create({
            data: {
                email,
            },
        });
        const profile = await this.prisma.profile.create({
            data: {
                role: client_1.UserRole.USER,
                userId: new_user.id,
            },
        });
        const token = await this.getToken(new_user.id);
        console.log(token);
        return token;
    }
    async refresh_token(id) {
        const token = await this.getToken(id, true);
        return token;
    }
    async isCheckPhone(data) {
        const user = await this.prisma.user.findUnique({
            where: { phone: data.phone },
        });
        if (user) {
            const token = await this.getToken(user.id);
            return token;
        }
        return user;
    }
    async isCheckEmail(data) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (user) {
            const token = await this.getToken(user.id);
            return token;
        }
        return user;
    }
    async loginOrRegisterWithTelegram(telegramData) {
        let user = await this.prisma.user.findUnique({
            where: { telegramChatId: telegramData.telegramId.toString() },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    telegramChatId: telegramData.telegramId.toString(),
                },
            });
            await this.prisma.profile.create({
                data: {
                    userId: user.id,
                    fullName: `${telegramData.firstName || ''} ${telegramData.lastName || ''}`.trim(),
                    imageUrl: telegramData.photoUrl,
                    role: client_1.UserRole.USER,
                },
            });
        }
        const token = await this.getToken(user.id);
        const { access_token, refresh_token } = token;
        return { access_token, refresh_token, user };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        verification_service_1.VerificationService])
], AuthService);
//# sourceMappingURL=auth.service.js.map