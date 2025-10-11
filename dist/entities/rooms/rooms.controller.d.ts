import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { GetRoomsQueryDto } from './dto/query-dto';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
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
    findMany(data: GetRoomsQueryDto): Promise<{
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
