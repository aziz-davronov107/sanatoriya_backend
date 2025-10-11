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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/db/prisma.service");
let RoomsService = class RoomsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRoomDto) {
        const room = await this.prisma.room.findUnique({
            where: { roomNumber: createRoomDto.roomNumber },
        });
        if (room)
            throw new common_1.ConflictException('Room already exists');
        const data = { ...createRoomDto };
        if (data.availableFrom)
            data.availableFrom = new Date(data.availableFrom);
        return this.prisma.room.create({ data });
    }
    async findMany(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;
        const where = {};
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
        if (typeof query.minPrice !== 'undefined' ||
            typeof query.maxPrice !== 'undefined') {
            where.pricePerDay = {};
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
        const orderBy = {};
        if (query.sortBy) {
            orderBy[query.sortBy] = 'asc';
        }
        else {
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
    async findOne(id) {
        const room = await this.prisma.room.findUnique({
            where: {
                id,
            },
            include: { category: true, photos: true },
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found!');
        }
        return room;
    }
    async update(id, updateRoomDto) {
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
            throw new common_1.NotFoundException('Room not found!');
        }
        if (exist_number) {
            throw new common_1.ConflictException('Room number already exists');
        }
        const data = { ...updateRoomDto };
        if (data.availableFrom)
            data.availableFrom = new Date(data.availableFrom);
        const room_set = await this.prisma.room.update({
            where: { id },
            data,
            include: { category: true, photos: true },
        });
        return room_set;
    }
    async remove(id) {
        const exist = await this.prisma.room.findUnique({ where: { id } });
        if (!exist)
            throw new common_1.NotFoundException('Room not found!');
        const deleted = await this.prisma.room.delete({ where: { id } });
        return deleted;
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map