import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { GetRoomsQueryDto } from './dto/query-dto';
import { PrismaService } from 'src/core/db/prisma.service';
export declare class RoomsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createRoomDto: CreateRoomDto): Promise<{
        id: number;
        title: string;
        description: string;
        roomNumber: number;
        pricePerDay: number;
        beds: number;
        bathrooms: number;
        floor: number;
        features: import("@prisma/client/runtime/library").JsonValue;
        categoryId: number;
        availableFrom: Date;
        isAvailable: boolean;
    }>;
    findMany(query: GetRoomsQueryDto): Promise<{
        data: ({
            category: {
                id: number;
                title: string;
            };
            photos: {
                id: number;
                url: string;
                orderIndex: number;
                roomId: number;
            }[];
        } & {
            id: number;
            title: string;
            description: string;
            roomNumber: number;
            pricePerDay: number;
            beds: number;
            bathrooms: number;
            floor: number;
            features: import("@prisma/client/runtime/library").JsonValue;
            categoryId: number;
            availableFrom: Date;
            isAvailable: boolean;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    findOne(id: number): Promise<{
        category: {
            id: number;
            title: string;
        };
        photos: {
            id: number;
            url: string;
            orderIndex: number;
            roomId: number;
        }[];
    } & {
        id: number;
        title: string;
        description: string;
        roomNumber: number;
        pricePerDay: number;
        beds: number;
        bathrooms: number;
        floor: number;
        features: import("@prisma/client/runtime/library").JsonValue;
        categoryId: number;
        availableFrom: Date;
        isAvailable: boolean;
    }>;
    update(id: number, updateRoomDto: UpdateRoomDto): Promise<{
        category: {
            id: number;
            title: string;
        };
        photos: {
            id: number;
            url: string;
            orderIndex: number;
            roomId: number;
        }[];
    } & {
        id: number;
        title: string;
        description: string;
        roomNumber: number;
        pricePerDay: number;
        beds: number;
        bathrooms: number;
        floor: number;
        features: import("@prisma/client/runtime/library").JsonValue;
        categoryId: number;
        availableFrom: Date;
        isAvailable: boolean;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        description: string;
        roomNumber: number;
        pricePerDay: number;
        beds: number;
        bathrooms: number;
        floor: number;
        features: import("@prisma/client/runtime/library").JsonValue;
        categoryId: number;
        availableFrom: Date;
        isAvailable: boolean;
    }>;
}
