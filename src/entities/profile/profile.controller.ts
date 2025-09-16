import { Controller, Get, Put, Body, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProfileService } from './profile.service';
import { UpdateProfileDto, UpdatePasswordDto } from './dto/profile.dto';
import { Roles } from 'src/core/decorators/role.decorator';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @Roles('USER', 'ADMIN','SALER')
  async getProfile(@Req() req: any) {
    return this.profileService.getProfile(req.user.id);
  }

  @Put('me')
  @Roles('USER', 'ADMIN','SALER')
  async updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(req.user.id, dto);
  }

  @Put('password')
  @Roles('USER', 'ADMIN','SALER')
  async updatePassword(@Req() req: any, @Body() dto: UpdatePasswordDto) {
    return this.profileService.updatePassword(req.user, dto);
  }

  @Put('avatar')
  @Roles('USER', 'ADMIN','SALER')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/profile',
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + extname(file.originalname));
      },
    }),
  }))
  async updateAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    // file.filename orqali saqlangan fayl nomi va urlni qaytarish mumkin
    return this.profileService.updateAvatar(req.user.id, `${process.env.STATIC_URL}/profile/${file.filename}`);
  }
}
