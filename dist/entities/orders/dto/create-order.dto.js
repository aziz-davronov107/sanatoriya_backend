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
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateOrderDto {
    roomId;
    duration;
    startDate;
    endDate;
    userId;
    hasDiscount;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, description: 'Room ID (orders.room_id)' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "roomId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Duration in days' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-10-11T12:00:00.000Z',
        description: 'Start date/time (orders.from)',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-10-14T12:00:00.000Z',
        description: 'End date/time (orders.to) — must be after startDate',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'User ID (orders.user_id)' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, description: 'Has discount flag' }),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === 'string' ? value === 'true' : value),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateOrderDto.prototype, "hasDiscount", void 0);
//# sourceMappingURL=create-order.dto.js.map