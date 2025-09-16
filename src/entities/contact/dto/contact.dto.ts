import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  time: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  accommodationId: string;
}
