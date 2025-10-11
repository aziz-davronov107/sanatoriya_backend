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
exports.ProfilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_1 = require("path");
const profiles_service_1 = require("./profiles.service");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const role_decorator_1 = require("../../core/decorators/role.decorator");
const client_1 = require("@prisma/client");
let ProfilesController = class ProfilesController {
    profilesService;
    constructor(profilesService) {
        this.profilesService = profilesService;
    }
    findAll() {
        return this.profilesService.findAll();
    }
    findOne(req) {
        const userId = req.user?.id ?? 1;
        return this.profilesService.findOne(userId);
    }
    async update(req, updateProfileDto, file) {
        if (req.fileValidationError) {
            throw new common_2.BadRequestException(req.fileValidationError);
        }
        const userId = req.user?.id ?? 1;
        const imageUrl = file
            ? `${process.env.STATIC_URL}/avatars/${file.filename}`
            : undefined;
        return this.profilesService.update(userId, updateProfileDto, imageUrl);
    }
    remove(id) {
        return this.profilesService.remove(id);
    }
};
exports.ProfilesController = ProfilesController;
__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Get all profiles' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of profiles returned successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfilesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('get_one'),
    (0, swagger_1.ApiOperation)({ summary: 'Get profile by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile found successfully' }),
    (0, role_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.USER),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProfilesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update'),
    (0, role_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.USER),
    (0, swagger_1.ApiOperation)({
        summary: 'Update profile and optionally upload avatar image',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Profile update data with optional avatar file',
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                    description: 'Avatar image file (PNG only)',
                },
                fullName: { type: 'string', example: 'Azizbek Azizbekov' },
                address: { type: 'string', example: 'Fergana, Uzbekistan' },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/avatars',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + (0, path_1.extname)(file.originalname));
            },
        }),
        fileFilter: (req, file, cb) => {
            if (file.mimetype === 'image/png') {
                cb(null, true);
            }
            else {
                req.fileValidationError = 'Only PNG images are allowed!';
                cb(null, false);
            }
        },
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, role_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete profile by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProfilesController.prototype, "remove", null);
exports.ProfilesController = ProfilesController = __decorate([
    (0, swagger_1.ApiTags)('Profiles'),
    (0, common_1.Controller)('profiles'),
    __metadata("design:paramtypes", [profiles_service_1.ProfilesService])
], ProfilesController);
//# sourceMappingURL=profiles.controller.js.map