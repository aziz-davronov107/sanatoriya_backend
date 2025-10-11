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
exports.CreateRoomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateRoomDto {
    roomNumber;
    pricePerDay;
    beds;
    bathrooms;
    floor;
    title;
    description;
    features;
    categoryId;
    availableFrom;
}
exports.CreateRoomDto = CreateRoomDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101, description: 'Unique room number' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "roomNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 350000,
        description: 'Price per day (in UZS or your unit)',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "pricePerDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "beds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "bathrooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Floor number' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "floor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Deluxe Twin Room' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 120),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Spacious twin room with city view, close to elevator.',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 2000),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Flexible JSON field (amenities, tags, etc.)',
        example: { wifi: true, view: 'city', extras: ['kettle', 'hairdryer'] },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateRoomDto.prototype, "features", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Room category ID (FK)' }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-10-10T00:00:00.000Z',
        description: 'ISO 8601 date when the room becomes available',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "availableFrom", void 0);
//# sourceMappingURL=create-room.dto.js.map