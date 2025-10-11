export declare class GetRoomsQueryDto {
    page?: number;
    limit?: number;
    sortBy?: 'pricePerDay' | 'availableFrom' | 'beds' | 'bathrooms' | 'floor' | 'roomNumber' | 'title';
    categoryId?: number;
    isAvailable?: boolean;
    minBeds?: number;
    minBathrooms?: number;
    minFloor?: number;
    minPrice?: number;
    maxPrice?: number;
    availableFromGte?: string;
    search?: string;
}
