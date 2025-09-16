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
exports.UpdateAccommodationDto = exports.CreateAccommodationDto = exports.AccommodationPriceUnit = exports.AccommodationListingType = exports.AccommodationStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var AccommodationStatus;
(function (AccommodationStatus) {
    AccommodationStatus["DRAFT"] = "DRAFT";
    AccommodationStatus["PUBLISHED"] = "PUBLISHED";
    AccommodationStatus["ARCHIVED"] = "ARCHIVED";
})(AccommodationStatus || (exports.AccommodationStatus = AccommodationStatus = {}));
var AccommodationListingType;
(function (AccommodationListingType) {
    AccommodationListingType["RENT"] = "RENT";
    AccommodationListingType["SALE"] = "SALE";
})(AccommodationListingType || (exports.AccommodationListingType = AccommodationListingType = {}));
var AccommodationPriceUnit;
(function (AccommodationPriceUnit) {
    AccommodationPriceUnit["PER_NIGHT"] = "PER_NIGHT";
    AccommodationPriceUnit["PER_MONTH"] = "PER_MONTH";
    AccommodationPriceUnit["TOTAL"] = "TOTAL";
})(AccommodationPriceUnit || (exports.AccommodationPriceUnit = AccommodationPriceUnit = {}));
class CreateAccommodationDto {
    isActive;
    status;
    listingType;
    title;
    address;
    description;
    city;
    price;
    currency;
    priceUnit;
    discount;
    buildYear;
    documents;
    categoryId;
}
exports.CreateAccommodationDto = CreateAccommodationDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateAccommodationDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: AccommodationStatus }),
    (0, class_validator_1.IsEnum)(AccommodationStatus),
    __metadata("design:type", String)
], CreateAccommodationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: AccommodationListingType }),
    (0, class_validator_1.IsEnum)(AccommodationListingType),
    __metadata("design:type", String)
], CreateAccommodationDto.prototype, "listingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAccommodationDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAccommodationDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAccommodationDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAccommodationDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)({}, { message: 'price must be a number' }),
    __metadata("design:type", Number)
], CreateAccommodationDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAccommodationDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: AccommodationPriceUnit }),
    (0, class_validator_1.IsEnum)(AccommodationPriceUnit),
    __metadata("design:type", String)
], CreateAccommodationDto.prototype, "priceUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAccommodationDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAccommodationDto.prototype, "buildYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateAccommodationDto.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAccommodationDto.prototype, "categoryId", void 0);
class UpdateAccommodationDto extends (0, swagger_1.PartialType)(CreateAccommodationDto) {
}
exports.UpdateAccommodationDto = UpdateAccommodationDto;
//# sourceMappingURL=accommodation.dto.js.map