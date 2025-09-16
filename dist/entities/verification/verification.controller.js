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
exports.VerificationController = void 0;
const common_1 = require("@nestjs/common");
const verification_service_1 = require("./verification.service");
const swagger_1 = require("@nestjs/swagger");
const verification_dto_1 = require("./dto/verification.dto");
const publick_decorator_1 = require("../../core/decorators/publick.decorator");
let VerificationController = class VerificationController {
    verificationService;
    constructor(verificationService) {
        this.verificationService = verificationService;
    }
    async sendOtp(body) {
        return this.verificationService.sendOtp(body);
    }
    async verifyOtp(body) {
        return this.verificationService.verifyOtp(body);
    }
};
exports.VerificationController = VerificationController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'OTP kodini yuborish',
        description: `Yuborish mumkin bo'lgan turlari:
    ${verification_dto_1.LimitedVerificationTypes.REGISTER},
    ${verification_dto_1.LimitedVerificationTypes.EMAIL_PASSWORD}`,
    }),
    (0, common_1.Post)('send'),
    (0, publick_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verification_dto_1.SendOtpDto]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "sendOtp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'OTP kodini tekshirish' }),
    (0, common_1.Post)('verify'),
    (0, publick_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verification_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], VerificationController.prototype, "verifyOtp", null);
exports.VerificationController = VerificationController = __decorate([
    (0, swagger_1.ApiTags)('Verification'),
    (0, common_1.Controller)('verification'),
    __metadata("design:paramtypes", [verification_service_1.VerificationService])
], VerificationController);
//# sourceMappingURL=verification.controller.js.map