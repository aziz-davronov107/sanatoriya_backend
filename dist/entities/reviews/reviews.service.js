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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/db/prisma.service");
const win32_1 = require("path/win32");
const fs = require("fs");
let ReviewsService = class ReviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createReviewDto, url, userId) {
        if (!url) {
            throw new common_1.NotFoundException('Video not found , please upload a video');
        }
        const review = await this.prisma.review.create({
            data: {
                ...createReviewDto,
                userId,
                url,
            },
        });
        return review;
    }
    findAll() {
        return this.prisma.review.findMany();
    }
    async findOne(id) {
        const existing = await this.prisma.review.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Review not found');
        }
        return existing;
    }
    async update(id, updateReviewDto, url, userId) {
        const existing = await this.prisma.review.findUnique({
            where: { id, userId },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Review not found');
        }
        if (existing.url) {
            const oldPath = this.publicUrlToLocalPath(existing.url);
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
        return this.prisma.review.update({
            where: { id },
            data: {
                ...updateReviewDto,
                url,
            },
        });
    }
    async remove(id) {
        const existing = await this.prisma.review.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Review not found');
        }
        if (existing.url) {
            const oldPath = this.publicUrlToLocalPath(existing.url);
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
        return this.prisma.review.delete({
            where: { id },
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
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map