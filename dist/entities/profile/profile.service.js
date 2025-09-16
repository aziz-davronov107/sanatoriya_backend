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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/db/prisma.service");
const verification_service_1 = require("../verification/verification.service");
const verification_1 = require("../../common/types/verification");
const bgcrypt = require("bcrypt");
let ProfileService = class ProfileService {
    prisma;
    verificationService;
    constructor(prisma, verificationService) {
        this.prisma = prisma;
        this.verificationService = verificationService;
    }
    async getProfile(id) {
        return await this.prisma.user.findUnique({ where: { id } });
    }
    async updateProfile(id, dto) {
        return await this.prisma.user.update({
            where: { id },
            data: dto
        });
    }
    async updatePassword(user, dto) {
        await this.verificationService.checkConfigOtp({
            type: verification_1.EverifationsTypes.EMAIL_PASSWORD,
            gmail: user.email,
            otp: dto.otp,
            email: user.email,
        });
        let hash = bgcrypt.hashSync(dto.newPassword, 10);
        let new_profile = await this.prisma.user.update({
            where: { id: user.id },
            data: { password: hash }
        });
        return new_profile;
    }
    async updateAvatar(id, avatarUrl) {
        return await this.prisma.user.update({
            where: { id },
            data: { avatar: avatarUrl }
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, verification_service_1.VerificationService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map