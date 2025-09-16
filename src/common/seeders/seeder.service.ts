// seeder.service.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/core/db/prisma.service';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const categories = [
  { name: 'Apartment', img: `${process.env.STATIC_URL}/categories/apartment.jpg`, iconImg:`${process.env.STATIC_URL}/icons/apartment.svg` },
  { name: 'House',     img: `${process.env.STATIC_URL}/categories/house.jpg`,     iconImg: `${process.env.STATIC_URL}/icons/house.svg` },
  { name: 'Villa',     img: `${process.env.STATIC_URL}/categories/villa.jpg`,     iconImg: `${process.env.STATIC_URL}/icons/villa.png` }, // <- ensure this path exists
  { name: 'Office',    img: `${process.env.STATIC_URL}/categories/office.jpg`,    iconImg: `${process.env.STATIC_URL}/icons/office.svg` },
];

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    if ((process.env.SEED_ON_BOOT || 'false').toLowerCase() === 'true') {
      try {
        await this.seedAll();
        this.logger.log('✅ Seeding completed');
      } catch (error: any) {
        this.logger.error('❌ Seeder error:', error?.message || error);
      }
    } else {
      this.logger.log('⏭️  Seeding skipped (SEED_ON_BOOT is not true)');
    }
  }

  async seedAll() {
    await this.seedAdmin();
    await this.seedCategories();
  }

  private async seedAdmin() {
    const email      = process.env.ADMIN_EMAIL     || 'admin@vip-house.uz';
    const firstname  = process.env.ADMIN_FIRSTNAME || 'Admin';
    const lastname   = process.env.ADMIN_LASTNAME  || 'User';
    const avatar     = process.env.ADMIN_AVATAR    || '/avatars/admin.png';
    const plainPass  = process.env.ADMIN_PASSWORD  || 'Admin123!';
    const saltRounds = 10;

    const existing = await this.prisma.user.findUnique({ where: { email } });

    // Optional: force reset when flag is set
    const forceReset = (process.env.ADMIN_RESET_PASSWORD_ON_SEED || 'false').toLowerCase() === 'true';

    if (!existing) {
      const hash = await bcrypt.hash(plainPass, saltRounds);
      await this.prisma.user.create({
        data: { email, password: hash, firstname, lastname, role: UserRole.ADMIN, avatar },
      });
      this.logger.log(`👤 Admin created: ${email}`);
      return;
    }

    await this.prisma.user.update({
      where: { email },
      data: {
        firstname,
        lastname,
        role: UserRole.ADMIN,
        avatar,
        ...(forceReset
          ? { password: await bcrypt.hash(plainPass, saltRounds) }
          : {}),
      },
    });
    this.logger.log(`🔁 Admin ensured/updated: ${email}${forceReset ? ' (password rotated)' : ''}`);
  }

  private async seedCategories() {
    await Promise.all(
      categories.map((c) =>
        this.prisma.category.upsert({
          where: { name: c.name }, // name is unique
          update: { img: c.img, iconImg: c.iconImg },
          create: { name: c.name, img: c.img, iconImg: c.iconImg },
        }),
      ),
    );
    this.logger.log('🏷️  Categories seeded/updated');
  }
}
