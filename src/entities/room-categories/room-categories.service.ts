import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class RoomCategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const categories = await this.prisma.roomCategory.findMany();
    return categories;
  }
}
