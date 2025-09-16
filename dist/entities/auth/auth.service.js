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
const bcrypt = require("bcrypt");
const verification_1 = require("../../common/types/verification");
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
        await this.verificationService.checkConfigOtp({
            type: verification_1.EverifationsTypes.REGISTER,
            gmail: payload.email,
            otp: payload.otp,
            email: payload.email,
        });
        let { email, password, firstname, lastname } = payload;
        const exists = await this.prisma.user.findUnique({
            where: { email },
        });
        if (exists) {
            throw new common_1.ConflictException('User already exists');
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
        console.log(token);
        return token;
    }
    async login(payload) {
        let user = await this.prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (!user || !(await bcrypt.compare(payload.password, user.password))) {
            throw new common_1.HttpException('Email or password incorrect', common_1.HttpStatus.BAD_REQUEST);
        }
        const token = await this.getToken(user.id);
        return token;
    }
    async refresh_token(id) {
        const token = await this.getToken(id, true);
        return token;
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