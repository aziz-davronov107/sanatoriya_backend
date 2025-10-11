import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path/win32';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname).toLowerCase();
        const isMp4Ext = ext === '.mp4';
        const isVideoMime = typeof file.mimetype === 'string' && file.mimetype.startsWith('video/');

        if (isMp4Ext || isVideoMime) {
          cb(null, true);
        } else {
          // Don't throw an error from the multer filter (that becomes a 500).
          // Instead mark the request and skip the file; controller will handle and return 400.
          (req as any).fileValidationError = 'Only MP4 videos are allowed!';
          cb(null, false);
        }
      },
      limits: {
        fileSize: 100 * 1024 * 1024,
      },
    }),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
