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
exports.GetRoomsQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class GetRoomsQueryDto {
    page = 1;
    limit = 10;
    sortBy = 'availableFrom';
    categoryId;
    isAvailable;
    minBeds;
    minBathrooms;
    minFloor;
    minPrice;
    maxPrice;
    availableFromGte;
    search;
}
exports.GetRoomsQueryDto = GetRoomsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Page number (1-based)' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetRoomsQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10, description: 'Items per page (max 100)' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetRoomsQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'pricePerDay',
        enum: [
            'pricePerDay',
            'availableFrom',
            'beds',
            'bathrooms',
            'floor',
            'roomNumber',
            'title',
        ],
    }),
    (0, class_validator_1.IsIn)([
        'pricePerDay',
        'availableFrom',
        'beds',
        'bathrooms',
        'floor',
        'roomNumber',
        'title',
    ]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetRoomsQueryDto.prototype, "sortBy", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetRoomsQueryDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true' ? true : value === 'false' ? false : undefined),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GetRoomsQueryDto.prototype, "isAvailable", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2, description: 'Minimum beds' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetRoomsQueryDto.prototype, "minBeds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1, description: 'Minimum bathrooms' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetRoomsQueryDto.prototype, "minBathrooms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 0,
        description: 'Minimum floor (0 = ground)',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetRoomsQueryDto.prototype, "minFloor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 100000,
        description: 'Minimum price per day',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetRoomsQueryDto.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 500000,
        description: 'Maximum price per day',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetRoomsQueryDto.prototype, "maxPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2025-10-10T00:00:00.000Z',
        description: 'Room must be available on/after this date',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetRoomsQueryDto.prototype, "availableFromGte", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Deluxe',
        description: 'Search in title/description (case-insensitive, contains)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetRoomsQueryDto.prototype, "search", void 0);
//# sourceMappingURL=query-dto.js.map