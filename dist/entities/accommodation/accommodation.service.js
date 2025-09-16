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
exports.AccommodationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/db/prisma.service");
let AccommodationService = class AccommodationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(q) {
        const where = {};
        const containsCI = (v) => v ? { contains: v, mode: 'insensitive' } : undefined;
        if (q.city)
            where.city = containsCI(q.city);
        if (q.title)
            where.title = containsCI(q.title);
        if (q.address)
            where.address = containsCI(q.address);
        if (q.description)
            where.description = containsCI(q.description);
        if (q.country)
            where.country = containsCI(q.country);
        if (q.region)
            where.region = containsCI(q.region);
        if (q.listingType)
            where.listingType = q.listingType;
        if (typeof q.categoryId === 'number')
            where.categoryId = q.categoryId;
        if (typeof q.price === 'number')
            where.price = q.price;
        if (typeof q.buildYear === 'number')
            where.buildYear = q.buildYear;
        if (typeof q.latitude === 'number')
            where.latitude = q.latitude;
        if (typeof q.longitude === 'number')
            where.longitude = q.longitude;
        return this.prisma.accommodation.findMany({
            where,
            include: {
                images: true,
                category: true,
                user: { select: { id: true, firstname: true, lastname: true, email: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const acc = await this.prisma.accommodation.findUnique({
            where: { id },
            include: {
                images: true,
                category: true,
                user: { select: { id: true, firstname: true, lastname: true, email: true } },
            },
        });
        if (!acc)
            throw new common_1.NotFoundException('Accommodation not found');
        return acc;
    }
    async create(dto) {
        const created = await this.prisma.accommodation.create({
            data: { ...dto },
            include: { images: true, category: true },
        });
        return created;
    }
    async update(id, dto) {
        await this.ensureExists(id);
        return this.prisma.accommodation.update({
            where: { id },
            data: dto,
            include: { images: true, category: true },
        });
    }
    async remove(id) {
        await this.ensureExists(id);
        await this.prisma.accommodation.delete({ where: { id } });
        return { success: true };
    }
    async ensureExists(id) {
        const ok = await this.prisma.accommodation.findUnique({ where: { id } });
        if (!ok)
            throw new common_1.NotFoundException('Accommodation not found');
    }
    async addImages(accommodationId, list) {
        const exists = await this.prisma.accommodation.findUnique({ where: { id: accommodationId } });
        if (!exists)
            throw new common_1.NotFoundException('Accommodation not found');
        await this.prisma.accommodationImage.createMany({
            data: list.map(i => ({
                accommodationId,
                url: i.url,
            })),
        });
        return this.prisma.accommodation.findUnique({
            where: { id: accommodationId },
            include: { images: true },
        });
    }
};
exports.AccommodationService = AccommodationService;
exports.AccommodationService = AccommodationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccommodationService);
//# sourceMappingURL=accommodation.service.js.map