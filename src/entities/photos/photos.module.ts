import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { extname } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

function imageFileFilter(req: any, file: Express.Multer.File, cb: Function) {
  // Faqat image/* qabul qilamiz
  if (!file.mimetype.startsWith('image/')) {
    // mark request and skip file; controller will return 400
    (req as any).fileValidationError = 'Only image files are allowed!';
    return cb(null, false);
  }
  cb(null, true);
}

function editFileName(req: any, file: Express.Multer.File, cb: Function) {
  const name = file.originalname.replace(/\.[^/.]+$/, '').replace(/\s+/g, '_');
  const fileExtName = extname(file.originalname).toLowerCase(); // .png, .jpg, ...
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  cb(null, `${name}-${uniqueSuffix}${fileExtName}`);
}

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: 'uploads/room_photos', // uploads/room_photos papkasiga saqlanadi
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: {
        files: 4, // bir requestda maksimum 4 ta file
        fileSize: 5 * 1024 ** 2, // 5MB limit (xohlasangiz o'zgartiring)
      },
    }),
  ],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
