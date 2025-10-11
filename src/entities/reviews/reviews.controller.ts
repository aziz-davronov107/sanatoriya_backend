import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/role.decorator';
import { UserRole } from '@prisma/client';
import { Public } from 'src/core/decorators/publick.decorator';
import { BadRequestException } from '@nestjs/common';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: { type: 'string', example: "Juda zo'r xizmat!" },
        // Interceptor nomi bilan BIR xil bo‘lsin: 'video'
        video: { type: 'string', format: 'binary' },
      },
      required: ['description'], // video ixtiyoriy bo‘lsa requiredga kiritmang
    },
  })
  @UseInterceptors(FileInterceptor('video'))
  create(
    @Body() createReviewDto: CreateReviewDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    if ((req as any).fileValidationError) {
      throw new BadRequestException((req as any).fileValidationError);
    }
    const url = file
      ? `${process.env.STATIC_URL}/videos/${file.filename}`
      : undefined;
    return this.reviewsService.create(createReviewDto, url, req.user.id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: { type: 'string', example: 'Yangilangan matn' },
        video: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('video'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    if ((req as any).fileValidationError) {
      throw new BadRequestException((req as any).fileValidationError);
    }
    const url = file
      ? `${process.env.STATIC_URL}/videos/${file.filename}`
      : undefined;
    return this.reviewsService.update(id, updateReviewDto, url, req.user.id);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reviewsService.findOne(id);
  }
}
