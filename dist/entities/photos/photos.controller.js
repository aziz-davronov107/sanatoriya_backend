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
exports.PhotosController = void 0;
const common_1 = require("@nestjs/common");
const photos_service_1 = require("./photos.service");
const create_photo_dto_1 = require("./dto/create-photo.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
let PhotosController = class PhotosController {
    photosService;
    constructor(photosService) {
        this.photosService = photosService;
    }
    create(files, createPhotoDto) {
        const imageUrls = (files ?? []).map((file) => `${process.env.STATIC_URL}/room_photos/${file.filename}`);
        return this.photosService.create(createPhotoDto, imageUrls);
    }
    update(id, file) {
        const url = file
            ? `${process.env.STATIC_URL}/room_photos/${file.filename}`
            : undefined;
        return this.photosService.update(+id, url);
    }
};
exports.PhotosController = PhotosController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                roomId: { type: 'number', example: 12 },
                files: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
            required: ['roomId', 'files'],
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Bir requestda 4 tagacha rasm yuklash' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Photos created' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 4)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, create_photo_dto_1.CreatePhotoDto]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Bitta rasmni yangilash (single file)' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOkResponse)({ description: 'Photo updated' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PhotosController.prototype, "update", null);
exports.PhotosController = PhotosController = __decorate([
    (0, swagger_1.ApiTags)('Photos'),
    (0, common_1.Controller)('photos'),
    __metadata("design:paramtypes", [photos_service_1.PhotosService])
], PhotosController);
//# sourceMappingURL=photos.controller.js.map