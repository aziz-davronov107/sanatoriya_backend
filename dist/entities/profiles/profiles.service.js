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
exports.ProfilesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/db/prisma.service");
const win32_1 = require("path/win32");
const fs = require("fs");
let ProfilesService = class ProfilesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const profiles = await this.prisma.profile.findMany();
        return profiles;
    }
    async findOne(userId) {
        const profile = await this.prisma.profile.findUnique({ where: { userId } });
        if (!profile)
            return null;
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        const reviews = await this.prisma.review.findMany({
            where: { userId },
        });
        return { ...profile, user: { ...(user ?? null), reviews } };
    }
    async update(id, updateProfileDto, imageUrl) {
        const existing = await this.prisma.profile.findUnique({
            where: { userId: id },
            select: { id: true, imageUrl: true },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Profile topilmadi');
        }
        const update_profile = await this.prisma.profile.update({
            data: {
                ...updateProfileDto,
                imageUrl,
            },
            where: {
                userId: id,
            },
        });
        if (existing.imageUrl) {
            const oldPath = this.publicUrlToLocalPath(existing.imageUrl);
            if (oldPath) {
                try {
                    await fs.promises.unlink(oldPath);
                }
                catch (err) {
                    if (err?.code !== 'ENOENT') {
                        throw new common_1.InternalServerErrorException(`Eski rasmni o‘chirishda xatolik: ${err?.message ?? err}`);
                    }
                }
            }
        }
        return {
            message: `Profile updated successfully`,
        };
    }
    async remove(id) {
        return await this.prisma.profile.update({
            where: { userId: id },
            data: {
                isDisabled: true,
            },
        });
    }
    publicUrlToLocalPath(publicUrl) {
        const base = (process.env.STATIC_URL ?? 'http://localhost:3000/static').replace(/\/+$/, '');
        if (!publicUrl.startsWith(base))
            return null;
        let rel = publicUrl.slice(base.length);
        rel = rel.replace(/^\/+|^\/+/g, '');
        const uploadsRoot = (0, win32_1.join)(process.cwd(), 'uploads');
        return (0, win32_1.join)(uploadsRoot, rel);
    }
};
exports.ProfilesService = ProfilesService;
exports.ProfilesService = ProfilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfilesService);
//# sourceMappingURL=profiles.service.js.map