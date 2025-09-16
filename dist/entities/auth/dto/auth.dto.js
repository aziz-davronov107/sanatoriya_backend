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
exports.LoginDto = exports.CreateDto = exports.UserRoleDto = void 0;
var UserRoleDto;
(function (UserRoleDto) {
    UserRoleDto["SALER"] = "SALER";
    UserRoleDto["USER"] = "USER";
})(UserRoleDto || (exports.UserRoleDto = UserRoleDto = {}));
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateDto {
    email;
    password;
    firstname;
    lastname;
    otp;
    role;
}
exports.CreateDto = CreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email',
        example: 'user@example.com',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Parol (kamida 6 ta belgidan iborat)',
        example: 'StrongP@ssw0rd',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ism',
        example: 'Azizbek',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDto.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Familiya',
        example: 'Davronov',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDto.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tasdiqlash коди (OTP)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDto.prototype, "otp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: UserRoleDto, description: 'Foydalanuvchi roli (faqat SALER yoki USER)', example: 'USER' }),
    (0, class_validator_1.IsEnum)(UserRoleDto),
    __metadata("design:type", String)
], CreateDto.prototype, "role", void 0);
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email',
        example: 'user@example.com',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Parol (kamida 6 ta belgidan iborat)',
        example: 'yandiev',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
//# sourceMappingURL=auth.dto.js.map