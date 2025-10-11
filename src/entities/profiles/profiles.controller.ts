import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  Body,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Roles } from 'src/core/decorators/role.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  // ✅ Get all profiles
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all profiles' })
  @ApiResponse({
    status: 200,
    description: 'List of profiles returned successfully',
  })
  findAll() {
    return this.profilesService.findAll();
  }

  // ✅ Get single profile
  @Get('get_one')
  @ApiOperation({ summary: 'Get profile by ID' })
  @ApiResponse({ status: 200, description: 'Profile found successfully' })
  @Roles(UserRole.ADMIN, UserRole.USER)
  findOne(@Req() req: any) {
    const userId = req.user?.id ?? 1;
    return this.profilesService.findOne(userId);
  }

  // ✅ Update profile + avatar upload
  @Patch('update')
  @Roles(UserRole.ADMIN, UserRole.USER)
  @ApiOperation({
    summary: 'Update profile and optionally upload avatar image',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Profile update data with optional avatar file',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Avatar image file (PNG only)',
        },
        fullName: { type: 'string', example: 'Azizbek Azizbekov' },
        address: { type: 'string', example: 'Fergana, Uzbekistan' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png') {
          cb(null, true);
        } else {
          (req as any).fileValidationError = 'Only PNG images are allowed!';
          cb(null, false);
        }
      },
    }),
  )
  async update(
    @Req() req: any,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if ((req as any).fileValidationError) {
      throw new BadRequestException((req as any).fileValidationError);
    }
    const userId = req.user?.id ?? 1;
    const imageUrl = file
      ? `${process.env.STATIC_URL}/avatars/${file.filename}`
      : undefined;
    return this.profilesService.update(userId, updateProfileDto, imageUrl);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete profile by ID' })
  @ApiResponse({ status: 200, description: 'Profile deleted successfully' })
  remove(@Param('id') id: number) {
    return this.profilesService.remove(id);
  }
}
