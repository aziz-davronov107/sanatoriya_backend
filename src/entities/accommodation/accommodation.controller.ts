import {
  Controller, Get, Param, Post, Body, Put, Delete,
  UploadedFiles, UseInterceptors, Query, ParseUUIDPipe, BadRequestException,
  Req
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AccommodationService } from './accommodation.service';
import { CreateAccommodationDto, UpdateAccommodationDto } from './dto/accommodation.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Roles, ROLES_KEY } from 'src/core/decorators/role.decorator';
import { Public } from 'src/core/decorators/publick.decorator';
import { Request } from 'express';

interface FindAllQueryDto {
  city?: string;
  title?: string;
  address?: string;
  description?: string;
  country?: string;
  region?: string;
  listingType?: 'RENT' | 'SALE';
  categoryId?: number;
  latitude?: number;
  longitude?: number;
  price?: number;       // simple equals; extend to min/max if needed
  buildYear?: number;
}

@ApiTags('accommodation')
@Controller('accommodation')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @Get()
  @Public()
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'price', required: false, type: Number })
  @ApiQuery({ name: 'listingType', required: false, enum: ['RENT', 'SALE'] })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'address', required: false })
  @ApiQuery({ name: 'description', required: false })
  @ApiQuery({ name: 'country', required: false })
  @ApiQuery({ name: 'region', required: false })
  @ApiQuery({ name: 'latitude', required: false, type: Number })
  @ApiQuery({ name: 'longitude', required: false, type: Number })
  @ApiQuery({ name: 'buildYear', required: false, type: Number })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  async findAll(@Query() q: FindAllQueryDto) {
    return this.accommodationService.findAll(q);
  }

  @Get(':id')
  @Roles("ADMIN","SALER","USER")
  @ApiParam({ name: 'id', type: String, description: 'Accommodation ID' })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.accommodationService.findOne(id);
  }
  @Roles("ADMIN","SALER")
  async findMy(@Req() req:Request) {
    return this.accommodationService.findOne((req as any).user.id);
  }

  @Post()
  @Roles("ADMIN","SALER")
  async create(@Body() dto: CreateAccommodationDto, @Req() req: Request) {
    // userId ni request.user.id dan olamiz
    const userId = (req as any).user.id;
    return this.accommodationService.create({ ...dto, userId });
  }

  @Put(':id')
  @Roles("ADMIN","SALER")
  @ApiParam({ name: 'id', type: String, description: 'Accommodation ID' })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: UpdateAccommodationDto) {
    return this.accommodationService.update(id, dto);
  }
  @Roles("ADMIN","SALER")
  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'Accommodation ID' })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.accommodationService.remove(id);
  }

  @Roles("ADMIN","SALER")
  @Post(':id/images')
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: String, description: 'Accommodation ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: { type: 'array', items: { type: 'string', format: 'binary' } },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 20, {
    storage: diskStorage({
      destination: join(process.cwd(), 'uploads', 'vip_house'),
      filename: (_req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + extname(file.originalname));
      },
    }),
  }))
  async uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id', new ParseUUIDPipe()) id: string
  ) {
    if (!files?.length) throw new BadRequestException('No files uploaded');
    const items = files.map(f => ({
      url: `${process.env.STATIC_URL}/vip_house/${f.filename}`,
      alt: null,
      sortOrder: 0,
    }));
    return this.accommodationService.addImages(id, items);
  }
}
