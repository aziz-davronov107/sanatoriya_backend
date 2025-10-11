import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { PrismaService } from 'src/core/db/prisma.service';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class PhotosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPhotoDto: CreatePhotoDto, imageUrls: string[]) {
    if (!imageUrls?.length) {
      throw new BadRequestException('Hech bo‘lmaganda 1 ta rasm yuboring.');
    }

    const last = await this.prisma.photo.findFirst({
      where: { roomId: createPhotoDto.roomId },
      orderBy: { orderIndex: 'desc' },
      select: { orderIndex: true },
    });

    const base = last?.orderIndex ?? -1;

    const rows = imageUrls.map((url, i) => ({
      ...createPhotoDto,
      url,
      orderIndex: base + i + 1,
    }));

    const created = await this.prisma.$transaction(
      rows.map((data) => this.prisma.photo.create({ data })),
    );

    return { message: 'Photos created', count: created.length, items: created };
  }

  /**
   * Eski rasm faylini diskdan o‘chirib, url’ni yangilaydi
   */
  async update(id: number, url: string | undefined) {
    if (!url) {
      throw new BadRequestException('Rasm URLsi yuborilishi shart.');
    }

    // 1) Mavjud yozuvni topamiz
    const existing = await this.prisma.photo.findUnique({
      where: { id },
      select: { id: true, url: true },
    });
    if (!existing) {
      throw new NotFoundException('Photo topilmadi');
    }

    // 2) Eski faylni o‘chirishga urinamiz (agar bo‘lsa)
    if (existing.url) {
      const oldPath = this.publicUrlToLocalPath(existing.url);
      if (oldPath) {
        try {
          await fs.unlink(oldPath);
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

    // 3) DBni yangilaymiz
    const updated = await this.prisma.photo.update({
      where: { id },
      data: { url },
    });

    return { message: `Photo #${id} updated`, item: updated };
  }

  /**
   * Public URL (STATIC_URL + '/room_photos/filename') ni lokal fayl yo‘liga map qiladi.
   * `main.ts` dagi `app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))`
   * konfiguratsiyasiga mos: lokal ildiz = `<projectRoot>/uploads`
   */
  private publicUrlToLocalPath(publicUrl: string): string | null {
    // Masalan: STATIC_URL = http://localhost:3000/static
    const base = (
      process.env.STATIC_URL ?? 'http://localhost:3000/static'
    ).replace(/\/+$/, '');
    if (!publicUrl.startsWith(base)) return null;

    // base dan keyingi nisbiy yo‘l: /room_photos/filename.png
    const rel = publicUrl.slice(base.length); // boshlanishi '/' bo‘lishi mumkin
    const uploadsRoot = join(process.cwd(), 'uploads'); // static serve qilinadigan papka

    return join(uploadsRoot, rel);
  }
}
