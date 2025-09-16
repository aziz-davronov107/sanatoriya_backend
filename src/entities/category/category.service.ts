import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/db/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma : PrismaService){ }
  async findAll() {
      const category = await this.prisma.category.findMany({
        
      })
      return category
    return
  }
  async findOne(id: number) {
    return 'ok';
  }
  async create() {
    return 'ok';
  }
  async update() {
    return 'ok';
  }
  async remove() {
    return 'ok';
  }
}
