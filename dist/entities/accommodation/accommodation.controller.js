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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccommodationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const accommodation_service_1 = require("./accommodation.service");
const accommodation_dto_1 = require("./dto/accommodation.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const role_decorator_1 = require("../../core/decorators/role.decorator");
const publick_decorator_1 = require("../../core/decorators/publick.decorator");
let AccommodationController = class AccommodationController {
    accommodationService;
    constructor(accommodationService) {
        this.accommodationService = accommodationService;
    }
    async findAll(q) {
        return this.accommodationService.findAll(q);
    }
    async findOne(id) {
        return this.accommodationService.findOne(id);
    }
    async findMy(req) {
        return this.accommodationService.findOne(req.user.id);
    }
    async create(dto, req) {
        const userId = req.user.id;
        return this.accommodationService.create({ ...dto, userId });
    }
    async update(id, dto) {
        return this.accommodationService.update(id, dto);
    }
    async remove(id) {
        return this.accommodationService.remove(id);
    }
    async uploadImages(files, id) {
        if (!files?.length)
            throw new common_1.BadRequestException('No files uploaded');
        const items = files.map(f => ({
            url: `${process.env.STATIC_URL}/vip_house/${f.filename}`,
            alt: null,
            sortOrder: 0,
        }));
        return this.accommodationService.addImages(id, items);
    }
};
exports.AccommodationController = AccommodationController;
__decorate([
    (0, common_1.Get)(),
    (0, publick_decorator_1.Public)(),
    (0, swagger_1.ApiQuery)({ name: 'city', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'price', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'listingType', required: false, enum: ['RENT', 'SALE'] }),
    (0, swagger_1.ApiQuery)({ name: 'title', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'description', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'country', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'region', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'latitude', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'longitude', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'buildYear', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'categoryId', required: false, type: Number }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, role_decorator_1.Roles)("ADMIN", "SALER", "USER"),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Accommodation ID' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "findOne", null);
__decorate([
    (0, role_decorator_1.Roles)("ADMIN", "SALER"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "findMy", null);
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)("ADMIN", "SALER"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accommodation_dto_1.CreateAccommodationDto, Object]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, role_decorator_1.Roles)("ADMIN", "SALER"),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Accommodation ID' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, accommodation_dto_1.UpdateAccommodationDto]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "update", null);
__decorate([
    (0, role_decorator_1.Roles)("ADMIN", "SALER"),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Accommodation ID' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "remove", null);
__decorate([
    (0, role_decorator_1.Roles)("ADMIN", "SALER"),
    (0, common_1.Post)(':id/images'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Accommodation ID' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                files: { type: 'array', items: { type: 'string', format: 'binary' } },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 20, {
        storage: (0, multer_1.diskStorage)({
            destination: (0, path_1.join)(process.cwd(), 'uploads', 'vip_house'),
            filename: (_req, file, cb) => {
                const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, unique + (0, path_1.extname)(file.originalname));
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "uploadImages", null);
exports.AccommodationController = AccommodationController = __decorate([
    (0, swagger_1.ApiTags)('accommodation'),
    (0, common_1.Controller)('accommodation'),
    __metadata("design:paramtypes", [accommodation_service_1.AccommodationService])
], AccommodationController);
//# sourceMappingURL=accommodation.controller.js.map