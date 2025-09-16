  import { Injectable, NotFoundException } from '@nestjs/common';
  import { PrismaService } from 'src/core/db/prisma.service';
  import { CreateAccommodationDto, UpdateAccommodationDto } from './dto/accommodation.dto';

  type FindAllQuery = {
    city?: string; title?: string; address?: string; description?: string;
    country?: string; region?: string; listingType?: 'RENT'|'SALE';
    categoryId?: number; latitude?: number; longitude?: number;
    price?: number; buildYear?: number;
  };

  @Injectable()
  export class AccommodationService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(q: FindAllQuery) {
      // Build Prisma where with safe partial filters
      const where: any = {};

      const containsCI = (v?: string) => v ? { contains: v, mode: 'insensitive' } : undefined;

      if (q.city)        where.city        = containsCI(q.city);
      if (q.title)       where.title       = containsCI(q.title);
      if (q.address)     where.address     = containsCI(q.address);
      if (q.description) where.description = containsCI(q.description);
      if (q.country)     where.country     = containsCI(q.country);
      if (q.region)      where.region      = containsCI(q.region);

      if (q.listingType) where.listingType = q.listingType;
      if (typeof q.categoryId === 'number') where.categoryId = q.categoryId;
      if (typeof q.price === 'number')      where.price = q.price;           // extend to { gte/lte } later
      if (typeof q.buildYear === 'number')  where.buildYear = q.buildYear;
      if (typeof q.latitude === 'number')   where.latitude = q.latitude;
      if (typeof q.longitude === 'number')  where.longitude = q.longitude;

      return this.prisma.accommodation.findMany({
        where,
        include: {
          images: true,
          category: true,
          user: { select: { id: true, firstname: true, lastname: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    async findOne(id: string) {
      const acc = await this.prisma.accommodation.findUnique({
        where: { id },
        include: {
          images: true,
          category: true,
          user: { select: { id: true, firstname: true, lastname: true, email: true } },
        },
      });
      if (!acc) throw new NotFoundException('Accommodation not found');
      return acc;
    }

    async create(dto: Omit<CreateAccommodationDto, 'userId'> & { userId: string }) {
      const created = await this.prisma.accommodation.create({
        data: { ...dto },
        include: { images: true, category: true },
      });
      return created;
    }

  async update(id: string, dto: UpdateAccommodationDto) {
    await this.ensureExists(id);
    return this.prisma.accommodation.update({
      where: { id },
      data: dto,
      include: { images: true, category: true },
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.accommodation.delete({ where: { id } });
    return { success: true };
  }

  private async ensureExists(id: string) {
    const ok = await this.prisma.accommodation.findUnique({ where: { id } });
    if (!ok) throw new NotFoundException('Accommodation not found');
  }

    async addImages(
      accommodationId: string,
      list: { url: string; alt?: string | null; sortOrder?: number }[],
    ) {
      const exists = await this.prisma.accommodation.findUnique({ where: { id: accommodationId } });
      if (!exists) throw new NotFoundException('Accommodation not found');

      await this.prisma.accommodationImage.createMany({
        data: list.map(i => ({
          accommodationId,
          url: i.url,
        })),
      });

      return this.prisma.accommodation.findUnique({
        where: { id: accommodationId },
        include: { images: true },
      });
    }
  }
