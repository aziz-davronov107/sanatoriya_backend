// seeder.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/core/db/prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    if ((process.env.SEED_ON_BOOT || 'false').toLowerCase() === 'true') {
      try {
        await this.seed();
        this.logger.log('✅ Seeding completed');
      } catch (error: any) {
        this.logger.error('❌ Seeder error:', error?.message || error);
      }
    } else {
      this.logger.log('⏭️  Seeding skipped (SEED_ON_BOOT is not true)');
    }
  }

  async seed() {
    this.logger.log('🌱 Running seeders...');

    const categories = [
      'Studio',
      'One Bedroom',
      'Two Bedroom',
      'Penthouse',
      'Deluxe',
    ];

    const existingCategories = await this.prisma.roomCategory.findMany({
      where: {
        title: {
          in: categories,
        },
      },
    });

    const existingTitles = existingCategories.map((cat) => cat.title);
    const newCategories = categories.filter(
      (title) => !existingTitles.includes(title),
    );

    if (newCategories.length > 0) {
      await this.prisma.roomCategory.createMany({
        data: newCategories.map((title) => ({ title })),
      });
    }
    return;
  }
}
