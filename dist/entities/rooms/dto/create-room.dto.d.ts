export type Features = Record<string, any> | any[];
export declare class CreateRoomDto {
    roomNumber: number;
    pricePerDay: number;
    beds: number;
    bathrooms: number;
    floor: number;
    title: string;
    description: string;
    features: Features;
    categoryId: number;
    availableFrom: string;
}
