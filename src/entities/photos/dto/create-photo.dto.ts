import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePhotoDto {
  @ApiProperty({
    type: Number,
    example: 2,
    description: 'Rasm tegishli bo‘lgan xonaning (room) ID raqami',
  })
  @Type(() => Number)
  @IsInt({ message: 'roomId butun son bo‘lishi kerak' })
  @IsNotEmpty({ message: 'roomId majburiy' })
  roomId: number;
}
