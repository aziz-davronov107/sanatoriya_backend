import { CreateOrderDto } from './create-order.dto';
declare const UpdateOrderDto_base: import("@nestjs/common").Type<Partial<CreateOrderDto>>;
export declare class UpdateOrderDto extends UpdateOrderDto_base {
    roomId?: number;
    duration?: number;
    startDate?: string;
    endDate?: string;
    userId?: number;
    hasDiscount?: boolean;
    totalAmount?: number;
}
export {};
