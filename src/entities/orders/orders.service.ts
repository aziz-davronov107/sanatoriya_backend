import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/core/db/prisma.service';
import { OrderStatus } from '@prisma/client';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Helper to compute whole-night count (min 1)
function diffNights(start: Date, end: Date) {
  const ms = end.getTime() - start.getTime();
  const nights = Math.ceil(ms / MS_PER_DAY);
  return nights < 1 ? 0 : nights;
}

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const start = new Date(createOrderDto.startDate);
    const end = new Date(createOrderDto.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid startDate or endDate');
    }
    if (end <= start) {
      throw new BadRequestException('endDate must be after startDate');
    }

    // Optional: Prevent booking in the past
    // if (start < new Date()) throw new BadRequestException('startDate is in the past');

    // Ensure room exists and get price
    const room = await this.prisma.room.findUnique({
      where: { id: createOrderDto.roomId },
      select: { id: true, pricePerDay: true },
    });
    if (!room) throw new NotFoundException('Room not found');

    // Ensure user exists
    const user = await this.prisma.user.findUnique({
      where: { id: createOrderDto.userId },
      select: { id: true },
    });
    if (!user) throw new NotFoundException('User not found');

    // Back-to-back allowed: overlap if existing.start < new.end AND existing.end > new.start
    // Also only block for statuses that actually occupy the room
    const blockingStatuses: OrderStatus[] = [
      OrderStatus.PENDING,
      OrderStatus.CONFIRMED,
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
      throw new ConflictException(
        'Room is already booked for the selected dates',
      );
    }

    const nights = diffNights(start, end);
    if (nights < 1) {
      throw new BadRequestException('Booking must be at least 1 night');
    }

    const hasDiscount = !!createOrderDto.hasDiscount;
    const baseTotal = nights * (room.pricePerDay ?? 0);

    // If you have concrete discount rules, apply them here:
    const totalAmount = baseTotal; // e.g., hasDiscount ? Math.round(baseTotal * 0.9) : baseTotal;

    const created = await this.prisma.order.create({
      data: {
        roomId: createOrderDto.roomId,
        userId: createOrderDto.userId,
        duration: nights, // trust computed duration
        startDate: start,
        endDate: end,
        hasDiscount,
        totalAmount,
        status: OrderStatus.PENDING,
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

  async findOne(id: number) {
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
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    const existing = await this.prisma.order.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Order not found');

    // Resolve new dates (fallback to existing)
    const start = dto.startDate ? new Date(dto.startDate) : existing.startDate;
    const end = dto.endDate ? new Date(dto.endDate) : existing.endDate;

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Invalid startDate or endDate');
    }
    if (end <= start) {
      throw new BadRequestException('endDate must be after startDate');
    }

    // If roomId is changing (or dates), re-check overlap excluding this order
    const roomId = dto.roomId ?? existing.roomId;
    const blockingStatuses: OrderStatus[] = [
      OrderStatus.PENDING,
      OrderStatus.CONFIRMED,
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
      throw new ConflictException(
        'Room is already booked for the selected dates',
      );
    }

    // If price depends on room, fetch it when room/dates change
    let totalAmount = existing.totalAmount;
    let duration = existing.duration;

    if (
      dto.startDate ||
      dto.endDate ||
      dto.roomId ||
      dto.hasDiscount !== undefined
    ) {
      const room = await this.prisma.room.findUnique({
        where: { id: roomId },
        select: { pricePerDay: true },
      });
      if (!room) throw new NotFoundException('Room not found');

      const nights = diffNights(start, end);
      if (nights < 1) {
        throw new BadRequestException('Booking must be at least 1 night');
      }

      const hasDiscount = dto.hasDiscount ?? existing.hasDiscount;
      const baseTotal = nights * (room.pricePerDay ?? 0);
      totalAmount = baseTotal; // apply discount if you have rules
      duration = nights;
    }

    // If userId is provided in DTO, ensure the user exists to prevent FK errors
    const newUserId = dto.userId ?? existing.userId;
    if (dto.userId !== undefined && dto.userId !== existing.userId) {
      const userCheck = await this.prisma.user.findUnique({
        where: { id: dto.userId },
      });
      if (!userCheck) throw new NotFoundException('User not found');
    }

    const updateData: any = {
      roomId,
      userId: newUserId,
      startDate: start,
      endDate: end,
      duration,
      hasDiscount: dto.hasDiscount ?? existing.hasDiscount,
      totalAmount,
    };
    updateData.status = OrderStatus.CONFIRMED;

    return this.prisma.order.update({ where: { id }, data: updateData });
  }

  async remove(id: number) {
    const existing = await this.prisma.order.findUnique({
      where: { id, status: OrderStatus.CONFIRMED },
    });
    if (!existing) throw new NotFoundException('Order not found');

    // If you prefer soft-delete or status change, do it here instead
    return this.prisma.order.delete({ where: { id } });
  }
}
