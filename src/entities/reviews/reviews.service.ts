import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/core/db/prisma.service';
import { join } from 'path/win32';
import * as fs from 'fs';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createReviewDto: CreateReviewDto,
    url: string | undefined,
    userId: number,
  ) {
    if (!url) {
      throw new NotFoundException('Video not found , please upload a video');
    }
    const review = await this.prisma.review.create({
      data: {
        ...createReviewDto,
        userId,
        url,
      },
    });

    return review;
  }

  findAll() {
    return this.prisma.review.findMany();
  }

  async findOne(id: number) {
    const existing = await this.prisma.review.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException('Review not found');
    }
    return existing;
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
    url: string | undefined,
    userId: number,
  ) {
    const existing = await this.prisma.review.findUnique({
      where: { id ,userId},
    });

    if (!existing) {
      throw new NotFoundException('Review not found');
    }
    if (existing.url) {
      const oldPath = this.publicUrlToLocalPath(existing.url);
      if (oldPath) {
        try {
          // use promise-based unlink so we can await it
          await fs.promises.unlink(oldPath);
        } catch (err: any) {
          // Fayl bo‘lmasligi normal holat (masalan, qo‘lda o‘chirilgan bo‘lishi mumkin)
          if (err?.code !== 'ENOENT') {
            // Boshqa xatolarni ko‘tarib yuboramiz
            throw new InternalServerErrorException(
              `Eski rasmni o‘chirishda xatolik: ${err?.message ?? err}`,
            );
          }
        }
      }
    }
    return this.prisma.review.update({
      where: { id },
      data: {
        ...updateReviewDto,
        url,
      },
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.review.findUnique({
      where: { id },
    });
    if (!existing) {
      throw new NotFoundException('Review not found');
    }

    if (existing.url) {
      const oldPath = this.publicUrlToLocalPath(existing.url);
      if (oldPath) {
        try {
          // use promise-based unlink so we can await it
          await fs.promises.unlink(oldPath);
        } catch (err: any) {
          // Fayl bo‘lmasligi normal holat (masalan, qo‘lda o‘chirilgan bo‘lishi mumkin)
          if (err?.code !== 'ENOENT') {
            // Boshqa xatolarni ko‘tarib yuboramiz
            throw new InternalServerErrorException(
              `Eski rasmni o‘chirishda xatolik: ${err?.message ?? err}`,
            );
          }
        }
      }
    }
    return this.prisma.review.delete({
      where: { id },
    });
  }

  private publicUrlToLocalPath(publicUrl: string): string | null {
    // Masalan: STATIC_URL = http://localhost:3000/static
    const base = (
      process.env.STATIC_URL ?? 'http://localhost:3000/static'
    ).replace(/\/+$/, '');
    if (!publicUrl.startsWith(base)) return null;

    // base dan keyingi nisbiy yo‘l: /room_photos/filename.png
    let rel = publicUrl.slice(base.length); // boshlanishi '/' bo‘lishi mumkin
    // remove leading slashes so join treats it as relative path on Windows
    rel = rel.replace(/^\/+|^\/+/g, '');
    const uploadsRoot = join(process.cwd(), 'uploads'); // static serve qilinadigan papka

    return join(uploadsRoot, rel);
  }
}
