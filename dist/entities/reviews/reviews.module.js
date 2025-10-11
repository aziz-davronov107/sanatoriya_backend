"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsModule = void 0;
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("./reviews.service");
const reviews_controller_1 = require("./reviews.controller");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const win32_1 = require("path/win32");
let ReviewsModule = class ReviewsModule {
};
exports.ReviewsModule = ReviewsModule;
exports.ReviewsModule = ReviewsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/videos',
                    filename: (req, file, cb) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        cb(null, uniqueSuffix + (0, win32_1.extname)(file.originalname));
                    },
                }),
                fileFilter: (req, file, cb) => {
                    const ext = (0, win32_1.extname)(file.originalname).toLowerCase();
                    const isMp4Ext = ext === '.mp4';
                    const isVideoMime = typeof file.mimetype === 'string' && file.mimetype.startsWith('video/');
                    if (isMp4Ext || isVideoMime) {
                        cb(null, true);
                    }
                    else {
                        req.fileValidationError = 'Only MP4 videos are allowed!';
                        cb(null, false);
                    }
                },
                limits: {
                    fileSize: 100 * 1024 * 1024,
                },
            }),
        ],
        controllers: [reviews_controller_1.ReviewsController],
        providers: [reviews_service_1.ReviewsService],
    })
], ReviewsModule);
//# sourceMappingURL=reviews.module.js.map