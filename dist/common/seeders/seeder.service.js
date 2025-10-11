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
let SeederService = SeederService_1 = class SeederService {
    prisma;
    logger = new common_1.Logger(SeederService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        if ((process.env.SEED_ON_BOOT || 'false').toLowerCase() === 'true') {
            try {
                await this.seed();
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
    async seed() {
        this.logger.log('🌱 Running seeders...');
        const categories = [
            'Studio',
            'One Bedroom',
            'Two Bedroom',
            'Penthouse',
            'Deluxe',
        ];
        const existingCategories = await this.prisma.roomCategory.findMany({
            where: {
                title: {
                    in: categories,
                },
            },
        });
        const existingTitles = existingCategories.map((cat) => cat.title);
        const newCategories = categories.filter((title) => !existingTitles.includes(title));
        if (newCategories.length > 0) {
            await this.prisma.roomCategory.createMany({
                data: newCategories.map((title) => ({ title })),
            });
        }
        return;
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = SeederService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SeederService);
//# sourceMappingURL=seeder.service.js.map