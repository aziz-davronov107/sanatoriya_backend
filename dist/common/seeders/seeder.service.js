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
var SeederService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/db/prisma.service");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const categories = [
    { name: 'Apartment', img: `${process.env.STATIC_URL}/categories/apartment.jpg`, iconImg: `${process.env.STATIC_URL}/icons/apartment.svg` },
    { name: 'House', img: `${process.env.STATIC_URL}/categories/house.jpg`, iconImg: `${process.env.STATIC_URL}/icons/house.svg` },
    { name: 'Villa', img: `${process.env.STATIC_URL}/categories/villa.jpg`, iconImg: `${process.env.STATIC_URL}/icons/villa.png` },
    { name: 'Office', img: `${process.env.STATIC_URL}/categories/office.jpg`, iconImg: `${process.env.STATIC_URL}/icons/office.svg` },
];
let SeederService = SeederService_1 = class SeederService {
    prisma;
    logger = new common_1.Logger(SeederService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        if ((process.env.SEED_ON_BOOT || 'false').toLowerCase() === 'true') {
            try {
                await this.seedAll();
                this.logger.log('✅ Seeding completed');
            }
            catch (error) {
                this.logger.error('❌ Seeder error:', error?.message || error);
            }
        }
        else {
            this.logger.log('⏭️  Seeding skipped (SEED_ON_BOOT is not true)');
        }
    }
    async seedAll() {
        await this.seedAdmin();
        await this.seedCategories();
    }
    async seedAdmin() {
        const email = process.env.ADMIN_EMAIL || 'admin@vip-house.uz';
        const firstname = process.env.ADMIN_FIRSTNAME || 'Admin';
        const lastname = process.env.ADMIN_LASTNAME || 'User';
        const avatar = process.env.ADMIN_AVATAR || '/avatars/admin.png';
        const plainPass = process.env.ADMIN_PASSWORD || 'Admin123!';
        const saltRounds = 10;
        const existing = await this.prisma.user.findUnique({ where: { email } });
        const forceReset = (process.env.ADMIN_RESET_PASSWORD_ON_SEED || 'false').toLowerCase() === 'true';
        if (!existing) {
            const hash = await bcrypt.hash(plainPass, saltRounds);
            await this.prisma.user.create({
                data: { email, password: hash, firstname, lastname, role: client_1.UserRole.ADMIN, avatar },
            });
            this.logger.log(`👤 Admin created: ${email}`);
            return;
        }
        await this.prisma.user.update({
            where: { email },
            data: {
                firstname,
                lastname,
                role: client_1.UserRole.ADMIN,
                avatar,
                ...(forceReset
                    ? { password: await bcrypt.hash(plainPass, saltRounds) }
                    : {}),
            },
        });
        this.logger.log(`🔁 Admin ensured/updated: ${email}${forceReset ? ' (password rotated)' : ''}`);
    }
    async seedCategories() {
        await Promise.all(categories.map((c) => this.prisma.category.upsert({
            where: { name: c.name },
            update: { img: c.img, iconImg: c.iconImg },
            create: { name: c.name, img: c.img, iconImg: c.iconImg },
        })));
        this.logger.log('🏷️  Categories seeded/updated');
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = SeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SeederService);
//# sourceMappingURL=seeder.service.js.map