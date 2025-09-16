import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  img: string;

  @ApiProperty({ name: 'iconImg' })
  iconImg: string;
}
