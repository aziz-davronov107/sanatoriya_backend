import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @ApiResponse({ type: [ContactDto] })
  async findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: ContactDto })
  async findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Post()
  async create(@Body() dto: ContactDto) {
    return this.contactService.create();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ContactDto) {
    return this.contactService.update();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contactService.remove();
  }
}
