import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';

import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('Photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        roomId: { type: 'number', example: 12 },
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' }, // <— muhim
        },
      },
      required: ['roomId', 'files'],
    },
  })
  @ApiOperation({ summary: 'Bir requestda 4 tagacha rasm yuklash' })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ description: 'Photos created' })
  @UseInterceptors(FilesInterceptor('files', 4)) // ko‘p fayl + limit=4
  create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPhotoDto: CreatePhotoDto,
  ) {
    const imageUrls = (files ?? []).map(
      (file) => `${process.env.STATIC_URL}/room_photos/${file.filename}`,
    );

    return this.photosService.create(createPhotoDto, imageUrls);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Bitta rasmni yangilash (single file)' })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ description: 'Photo updated' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' }, // <— muhim
      },
    },
  })
  update(@Param('id') id: string, @UploadedFile() file?: Express.Multer.File) {
    const url = file
      ? `${process.env.STATIC_URL}/room_photos/${file.filename}`
      : undefined;

    return this.photosService.update(+id, url);
  }
}
