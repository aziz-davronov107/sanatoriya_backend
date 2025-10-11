import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsEnum,
  IsDateString,
  Min,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { OrderStatus } from 'src/common/types/orderStatus';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiPropertyOptional({ example: 2 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  roomId?: number;

  @ApiPropertyOptional({ example: 4 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number;

  @ApiPropertyOptional({ example: '2025-10-12T12:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2025-10-16T12:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional({ example: 7 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  userId?: number;

  @ApiPropertyOptional({ example: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value === 'true' : value,
  )
  @IsOptional()
  @IsBoolean()
  hasDiscount?: boolean;

  @ApiPropertyOptional({ example: 980000 })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  totalAmount?: number;
}
