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
exports.PhotosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/db/prisma.service");
const fs_1 = require("fs");
const path_1 = require("path");
let PhotosService = class PhotosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPhotoDto, imageUrls) {
        if (!imageUrls?.length) {
            throw new common_1.BadRequestException('Hech bo‘lmaganda 1 ta rasm yuboring.');
        }
        const last = await this.prisma.photo.findFirst({
            where: { roomId: createPhotoDto.roomId },
            orderBy: { orderIndex: 'desc' },
            select: { orderIndex: true },
        });
        const base = last?.orderIndex ?? -1;
        const rows = imageUrls.map((url, i) => ({
            ...createPhotoDto,
            url,
            orderIndex: base + i + 1,
        }));
        const created = await this.prisma.$transaction(rows.map((data) => this.prisma.photo.create({ data })));
        return { message: 'Photos created', count: created.length, items: created };
    }
    async update(id, url) {
        if (!url) {
            throw new common_1.BadRequestException('Rasm URLsi yuborilishi shart.');
        }
        const existing = await this.prisma.photo.findUnique({
            where: { id },
            select: { id: true, url: true },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Photo topilmadi');
        }
        if (existing.url) {
            const oldPath = this.publicUrlToLocalPath(existing.url);
            if (oldPath) {
                try {
                    await fs_1.promises.unlink(oldPath);
                }
                catch (err) {
                    if (err?.code !== 'ENOENT') {
                        throw new common_1.InternalServerErrorException(`Eski rasmni o‘chirishda xatolik: ${err?.message ?? err}`);
                    }
                }
            }
        }
        const updated = await this.prisma.photo.update({
            where: { id },
            data: { url },
        });
        return { message: `Photo #${id} updated`, item: updated };
    }
    publicUrlToLocalPath(publicUrl) {
        const base = (process.env.STATIC_URL ?? 'http://localhost:3000/static').replace(/\/+$/, '');
        if (!publicUrl.startsWith(base))
            return null;
        const rel = publicUrl.slice(base.length);
        const uploadsRoot = (0, path_1.join)(process.cwd(), 'uploads');
        return (0, path_1.join)(uploadsRoot, rel);
    }
};
exports.PhotosService = PhotosService;
exports.PhotosService = PhotosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PhotosService);
//# sourceMappingURL=photos.service.js.map