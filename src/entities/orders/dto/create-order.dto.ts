import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  Min,
  IsDateString,
} from 'class-validator';
import { OrderStatus } from 'src/common/types/orderStatus';

export class CreateOrderDto {
  @ApiProperty({ example: 12, description: 'Room ID (orders.room_id)' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  roomId: number;

  @ApiProperty({ example: 3, description: 'Duration in days' })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  duration: number;

  @ApiProperty({
    example: '2025-10-11T12:00:00.000Z',
    description: 'Start date/time (orders.from)',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2025-10-14T12:00:00.000Z',
    description: 'End date/time (orders.to) — must be after startDate',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 5, description: 'User ID (orders.user_id)' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  userId: number;

  @ApiPropertyOptional({ example: false, description: 'Has discount flag' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value === 'true' : value,
  )
  @IsOptional()
  @IsBoolean()
  hasDiscount?: boolean;
}
