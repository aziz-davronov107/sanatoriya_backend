import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import {
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { GetRoomsQueryDto } from './dto/query-dto';
import { Roles } from 'src/core/decorators/role.decorator';
import { UserRole } from '@prisma/client';
import { Public } from 'src/core/decorators/publick.decorator';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiCreatedResponse({ description: 'Room created' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiBody({ type: CreateRoomDto })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get('get_all')
  @Public()
  @ApiOperation({
    summary: 'Get list of rooms with filters, pagination and sorting',
  })
  async findMany(@Query() data: GetRoomsQueryDto) {
    return this.roomsService.findMany(data);
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get room by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ description: 'Room details' })
  findOne(@Param('id') id: number) {
    return this.roomsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update room by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateRoomDto })
  update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete room by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiNoContentResponse({ description: 'Room deleted' })
  remove(@Param('id') id: number) {
    return this.roomsService.remove(id);
  }
}
