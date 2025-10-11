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
exports.UpdateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_order_dto_1 = require("./create-order.dto");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateOrderDto extends (0, swagger_1.PartialType)(create_order_dto_1.CreateOrderDto) {
    roomId;
    duration;
    startDate;
    endDate;
    userId;
    hasDiscount;
    totalAmount;
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "roomId", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 4 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: '2025-10-12T12:00:00.000Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: '2025-10-16T12:00:00.000Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 7 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: true }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value === 'true' : value),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateOrderDto.prototype, "hasDiscount", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 980000 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "totalAmount", void 0);
//# sourceMappingURL=update-order.dto.js.map