import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/core/db/prisma.service';
import { join } from 'path/win32';
import * as fs from 'fs';

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}
  // Get all profiles
  async findAll() {
    const profiles = await this.prisma.profile.findMany();
    return profiles;
  }

  // Get single profile
  async findOne(userId: number) {
    // Fetch the profile (without nested includes to avoid generated-type mismatches)
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) return null;

    // Fetch the user separately
    const user = await this.prisma.user.findUnique({
      where: { id: userId } as any,
    });

    // Fetch reviews separately. Use `as any` on where to avoid workspace type mismatch
    // between generated Prisma types and the editor TS server.
    const reviews = await this.prisma.review.findMany({
      where: { userId } as any,
    });

    // Attach reviews to user object for the caller
    return { ...profile, user: { ...(user ?? null), reviews } };
  }

  // Update profile

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
    imageUrl?: string,
  ) {
    // find existing profile by userId so we know previous image (if any)
    const existing = await this.prisma.profile.findUnique({
      where: { userId: id },
      select: { id: true, imageUrl: true },
    });
    if (!existing) {
      throw new NotFoundException('Profile topilmadi');
    }

    const update_profile = await this.prisma.profile.update({
      data: {
        ...updateProfileDto,
        imageUrl,
      },
      where: {
        userId: id,
      },
    });

    // 2) Eski faylni o‘chirishga urinamiz (agar bo‘lsa)
    if (existing.imageUrl) {
      const oldPath = this.publicUrlToLocalPath(existing.imageUrl);
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
    return {
      message: `Profile updated successfully`,
    };
  }

  // Delete profile
  async remove(id: number) {
    return await this.prisma.profile.update({
      where: { userId: id },
      data: {
        isDisabled: true,
      },
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
