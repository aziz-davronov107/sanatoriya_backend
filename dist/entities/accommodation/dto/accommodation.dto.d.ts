export declare enum AccommodationStatus {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    ARCHIVED = "ARCHIVED"
}
export declare enum AccommodationListingType {
    RENT = "RENT",
    SALE = "SALE"
}
export declare enum AccommodationPriceUnit {
    PER_NIGHT = "PER_NIGHT",
    PER_MONTH = "PER_MONTH",
    TOTAL = "TOTAL"
}
export declare class CreateAccommodationDto {
    isActive: boolean;
    status: AccommodationStatus;
    listingType: AccommodationListingType;
    title: string;
    address: string;
    description: string;
    city?: string;
    price: number;
    currency: string;
    priceUnit: AccommodationPriceUnit;
    discount: number;
    buildYear?: number;
    documents?: any;
    categoryId: number;
}
declare const UpdateAccommodationDto_base: import("@nestjs/common").Type<Partial<CreateAccommodationDto>>;
export declare class UpdateAccommodationDto extends UpdateAccommodationDto_base {
}
export {};
