"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosModule = void 0;
const common_1 = require("@nestjs/common");
const photos_service_1 = require("./photos.service");
const photos_controller_1 = require("./photos.controller");
const path_1 = require("path");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
function imageFileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(null, false);
    }
    cb(null, true);
}
function editFileName(req, file, cb) {
    const name = file.originalname.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_');
    const fileExtName = (0, path_1.extname)(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${name}-${uniqueSuffix}${fileExtName}`);
}
let PhotosModule = class PhotosModule {
};
exports.PhotosModule = PhotosModule;
exports.PhotosModule = PhotosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: 'uploads/room_photos',
                    filename: editFileName,
                }),
                fileFilter: imageFileFilter,
                limits: {
                    files: 4,
                    fileSize: 5 * 1024 ** 2,
                },
            }),
        ],
        controllers: [photos_controller_1.PhotosController],
        providers: [photos_service_1.PhotosService],
    })
], PhotosModule);
//# sourceMappingURL=photos.module.js.map