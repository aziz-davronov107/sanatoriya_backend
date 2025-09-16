import { PrismaService } from 'src/core/db/prisma.service';
import { CreateAccommodationDto, UpdateAccommodationDto } from './dto/accommodation.dto';
type FindAllQuery = {
    city?: string;
    title?: string;
    address?: string;
    description?: string;
    country?: string;
    region?: string;
    listingType?: 'RENT' | 'SALE';
    categoryId?: number;
    latitude?: number;
    longitude?: number;
    price?: number;
    buildYear?: number;
};
export declare class AccommodationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(q: FindAllQuery): Promise<({
        user: {
            id: string;
            firstname: string;
            lastname: string;
            email: string;
        };
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            img: string;
            iconImg: string;
        };
        images: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            accommodationId: string;
            url: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        status: import(".prisma/client").$Enums.ListingStatus;
        listingType: import(".prisma/client").$Enums.ListingType;
        title: string;
        address: string;
        description: string;
        city: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        priceUnit: import(".prisma/client").$Enums.PriceUnit;
        discount: import("@prisma/client/runtime/library").Decimal;
        buildYear: number | null;
        documents: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            firstname: string;
            lastname: string;
            email: string;
        };
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            img: string;
            iconImg: string;
        };
        images: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            accommodationId: string;
            url: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        status: import(".prisma/client").$Enums.ListingStatus;
        listingType: import(".prisma/client").$Enums.ListingType;
        title: string;
        address: string;
        description: string;
        city: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        priceUnit: import(".prisma/client").$Enums.PriceUnit;
        discount: import("@prisma/client/runtime/library").Decimal;
        buildYear: number | null;
        documents: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(dto: Omit<CreateAccommodationDto, 'userId'> & {
        userId: string;
    }): Promise<{
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            img: string;
            iconImg: string;
        };
        images: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            accommodationId: string;
            url: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        status: import(".prisma/client").$Enums.ListingStatus;
        listingType: import(".prisma/client").$Enums.ListingType;
        title: string;
        address: string;
        description: string;
        city: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        priceUnit: import(".prisma/client").$Enums.PriceUnit;
        discount: import("@prisma/client/runtime/library").Decimal;
        buildYear: number | null;
        documents: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateAccommodationDto): Promise<{
        category: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            img: string;
            iconImg: string;
        };
        images: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            accommodationId: string;
            url: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        status: import(".prisma/client").$Enums.ListingStatus;
        listingType: import(".prisma/client").$Enums.ListingType;
        title: string;
        address: string;
        description: string;
        city: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        priceUnit: import(".prisma/client").$Enums.PriceUnit;
        discount: import("@prisma/client/runtime/library").Decimal;
        buildYear: number | null;
        documents: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    private ensureExists;
    addImages(accommodationId: string, list: {
        url: string;
        alt?: string | null;
        sortOrder?: number;
    }[]): Promise<({
        images: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            accommodationId: string;
            url: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        status: import(".prisma/client").$Enums.ListingStatus;
        listingType: import(".prisma/client").$Enums.ListingType;
        title: string;
        address: string;
        description: string;
        city: string | null;
        price: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        priceUnit: import(".prisma/client").$Enums.PriceUnit;
        discount: import("@prisma/client/runtime/library").Decimal;
        buildYear: number | null;
        documents: import("@prisma/client/runtime/library").JsonValue | null;
        userId: string;
        categoryId: number;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
}
export {};
