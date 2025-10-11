import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { GetRoomsQueryDto } from './dto/query-dto';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    const room = await this.prisma.room.findUnique({
      where: { roomNumber: createRoomDto.roomNumber },
    });
    if (room) throw new ConflictException('Room already exists');

    const data: any = { ...createRoomDto };
    if (data.availableFrom) data.availableFrom = new Date(data.availableFrom);

    return this.prisma.room.create({ data });
  }

  async findMany(query: GetRoomsQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (typeof query.categoryId !== 'undefined')
      where.categoryId = query.categoryId;
    if (typeof query.isAvailable !== 'undefined')
      where.isAvailable = query.isAvailable;
    if (typeof query.minBeds !== 'undefined')
      where.beds = { gte: query.minBeds };
    if (typeof query.minBathrooms !== 'undefined')
      where.bathrooms = { gte: query.minBathrooms };
    if (typeof query.minFloor !== 'undefined')
      where.floor = { gte: query.minFloor };
    if (
      typeof query.minPrice !== 'undefined' ||
      typeof query.maxPrice !== 'undefined'
    ) {
      where.pricePerDay = {} as any;
      if (typeof query.minPrice !== 'undefined')
        where.pricePerDay.gte = query.minPrice;
      if (typeof query.maxPrice !== 'undefined')
        where.pricePerDay.lte = query.maxPrice;
    }
    if (typeof query.availableFromGte !== 'undefined') {
      where.availableFrom = { gte: new Date(query.availableFromGte) };
    }
    if (typeof query.search !== 'undefined' && query.search.trim() !== '') {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const orderBy: any = {};
    if (query.sortBy) {
      orderBy[query.sortBy] = 'asc';
    } else {
      orderBy.availableFrom = 'asc';
    }

    const [data, total] = await Promise.all([
      this.prisma.room.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: { category: true, photos: true },
      }),
      this.prisma.room.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page: total > 0 ? page : 1,
        limit: total > 0 ? limit : 0,
        pages: total > 0 ? Math.ceil(total / limit) : 1,
      },
    };
  }

  async findOne(id: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
      include: { category: true, photos: true },
    });
    if (!room) {
      throw new NotFoundException('Room not found!');
    }

    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const exist_room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    });
    const exist_number = await this.prisma.room.findUnique({
      where: {
        roomNumber: updateRoomDto.roomNumber,
      },
    });
    if (!exist_room) {
      throw new NotFoundException('Room not found!');
    }
    if (exist_number) {
      throw new ConflictException('Room number already exists');
    }

    const data: any = { ...updateRoomDto };
    if (data.availableFrom) data.availableFrom = new Date(data.availableFrom);

    const room_set = await this.prisma.room.update({
      where: { id },
      data,
      include: { category: true, photos: true },
    });

    return room_set;
  }

  async remove(id: number) {
    const exist = await this.prisma.room.findUnique({ where: { id } });
    if (!exist) throw new NotFoundException('Room not found!');

    const deleted = await this.prisma.room.delete({ where: { id } });
    return deleted;
  }
}
