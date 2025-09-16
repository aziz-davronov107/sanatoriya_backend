import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';

@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Get()
  @ApiResponse({ type: [LikeDto] })
  async findAll() {
    return this.likeService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: LikeDto })
  async findOne(@Param('id') id: number) {
    return this.likeService.findOne(id);
  }

  @Post()
  async create(@Body() dto: LikeDto) {
    return this.likeService.create();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: LikeDto) {
    return this.likeService.update();
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.likeService.remove();
  }
}
