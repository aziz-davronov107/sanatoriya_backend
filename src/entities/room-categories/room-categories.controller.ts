import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomCategoriesService } from './room-categories.service';
import { Public } from 'src/core/decorators/publick.decorator';

@Controller('room-categories')
export class RoomCategoriesController {
  constructor(private readonly roomCategoriesService: RoomCategoriesService) {}
  @Get()
  @Public()
  findAll() {
    return this.roomCategoriesService.findAll();
  }
}
