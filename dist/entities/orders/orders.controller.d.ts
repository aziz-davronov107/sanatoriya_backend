import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        id: number;
        userId: number;
        roomId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        duration: number;
        startDate: Date;
        endDate: Date;
        hasDiscount: boolean;
        totalAmount: number;
    }>;
    findAll(): Promise<({
        user: {
            profile: {
                fullName: string | null;
            } | null;
            id: number;
            email: string | null;
        };
        room: {
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
        };
    } & {
        id: number;
        userId: number;
        roomId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        duration: number;
        startDate: Date;
        endDate: Date;
        hasDiscount: boolean;
        totalAmount: number;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            profile: {
                fullName: string | null;
            } | null;
            id: number;
            email: string | null;
        };
        room: {
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
        };
    } & {
        id: number;
        userId: number;
        roomId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        duration: number;
        startDate: Date;
        endDate: Date;
        hasDiscount: boolean;
        totalAmount: number;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        id: number;
        userId: number;
        roomId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        duration: number;
        startDate: Date;
        endDate: Date;
        hasDiscount: boolean;
        totalAmount: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        userId: number;
        roomId: number;
        status: import(".prisma/client").$Enums.OrderStatus;
        duration: number;
        startDate: Date;
        endDate: Date;
        hasDiscount: boolean;
        totalAmount: number;
    }>;
}
