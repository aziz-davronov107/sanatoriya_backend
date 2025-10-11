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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/db/prisma.service");
const client_1 = require("@prisma/client");
const MS_PER_DAY = 24 * 60 * 60 * 1000;
function diffNights(start, end) {
    const ms = end.getTime() - start.getTime();
    const nights = Math.ceil(ms / MS_PER_DAY);
    return nights < 1 ? 0 : nights;
}
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        const start = new Date(createOrderDto.startDate);
        const end = new Date(createOrderDto.endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new common_1.BadRequestException('Invalid startDate or endDate');
        }
        if (end <= start) {
            throw new common_1.BadRequestException('endDate must be after startDate');
        }
        const room = await this.prisma.room.findUnique({
            where: { id: createOrderDto.roomId },
            select: { id: true, pricePerDay: true },
        });
        if (!room)
            throw new common_1.NotFoundException('Room not found');
        const user = await this.prisma.user.findUnique({
            where: { id: createOrderDto.userId },
            select: { id: true },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const blockingStatuses = [
            client_1.OrderStatus.PENDING,
            client_1.OrderStatus.CONFIRMED,
        ];
        const overlapping = await this.prisma.order.findFirst({
            where: {
                roomId: createOrderDto.roomId,
                status: { in: blockingStatuses },
                startDate: { lt: end },
                endDate: { gt: start },
            },
            select: { id: true, startDate: true, endDate: true, status: true },
        });
        if (overlapping) {
            throw new common_1.ConflictException('Room is already booked for the selected dates');
        }
        const nights = diffNights(start, end);
        if (nights < 1) {
            throw new common_1.BadRequestException('Booking must be at least 1 night');
        }
        const hasDiscount = !!createOrderDto.hasDiscount;
        const baseTotal = nights * (room.pricePerDay ?? 0);
        const totalAmount = baseTotal;
        const created = await this.prisma.order.create({
            data: {
                roomId: createOrderDto.roomId,
                userId: createOrderDto.userId,
                duration: nights,
                startDate: start,
                endDate: end,
                hasDiscount,
                totalAmount,
                status: client_1.OrderStatus.PENDING,
            },
        });
        return created;
    }
    async findAll() {
        return this.prisma.order.findMany({
            include: {
                room: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        profile: { select: { fullName: true } },
                    },
                },
            },
            orderBy: { startDate: 'desc' },
        });
    }
    async findOne(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                room: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        profile: { select: { fullName: true } },
                    },
                },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async update(id, dto) {
        const existing = await this.prisma.order.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Order not found');
        const start = dto.startDate ? new Date(dto.startDate) : existing.startDate;
        const end = dto.endDate ? new Date(dto.endDate) : existing.endDate;
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new common_1.BadRequestException('Invalid startDate or endDate');
        }
        if (end <= start) {
            throw new common_1.BadRequestException('endDate must be after startDate');
        }
        const roomId = dto.roomId ?? existing.roomId;
        const blockingStatuses = [
            client_1.OrderStatus.PENDING,
            client_1.OrderStatus.CONFIRMED,
        ];
        const overlap = await this.prisma.order.findFirst({
            where: {
                id: { not: id },
                roomId,
                status: { in: blockingStatuses },
                startDate: { lt: end },
                endDate: { gt: start },
            },
            select: { id: true },
        });
        if (overlap) {
            throw new common_1.ConflictException('Room is already booked for the selected dates');
        }
        let totalAmount = existing.totalAmount;
        let duration = existing.duration;
        if (dto.startDate ||
            dto.endDate ||
            dto.roomId ||
            dto.hasDiscount !== undefined) {
            const room = await this.prisma.room.findUnique({
                where: { id: roomId },
                select: { pricePerDay: true },
            });
            if (!room)
                throw new common_1.NotFoundException('Room not found');
            const nights = diffNights(start, end);
            if (nights < 1) {
                throw new common_1.BadRequestException('Booking must be at least 1 night');
            }
            const hasDiscount = dto.hasDiscount ?? existing.hasDiscount;
            const baseTotal = nights * (room.pricePerDay ?? 0);
            totalAmount = baseTotal;
            duration = nights;
        }
        const newUserId = dto.userId ?? existing.userId;
        if (dto.userId !== undefined && dto.userId !== existing.userId) {
            const userCheck = await this.prisma.user.findUnique({
                where: { id: dto.userId },
            });
            if (!userCheck)
                throw new common_1.NotFoundException('User not found');
        }
        const updateData = {
            roomId,
            userId: newUserId,
            startDate: start,
            endDate: end,
            duration,
            hasDiscount: dto.hasDiscount ?? existing.hasDiscount,
            totalAmount,
        };
        updateData.status = client_1.OrderStatus.CONFIRMED;
        return this.prisma.order.update({ where: { id }, data: updateData });
    }
    async remove(id) {
        const existing = await this.prisma.order.findUnique({
            where: { id, status: client_1.OrderStatus.CONFIRMED },
        });
        if (!existing)
            throw new common_1.NotFoundException('Order not found');
        return this.prisma.order.delete({ where: { id } });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map