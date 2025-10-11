// src/rooms/dto/get-rooms.query.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class GetRoomsQueryDto {
  @ApiPropertyOptional({ example: 1, description: 'Page number (1-based)' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Items per page (max 100)' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    example: 'pricePerDay',
    enum: [
      'pricePerDay',
      'availableFrom',
      'beds',
      'bathrooms',
      'floor',
      'roomNumber',
      'title',
    ],
  })
  @IsIn([
    'pricePerDay',
    'availableFrom',
    'beds',
    'bathrooms',
    'floor',
    'roomNumber',
    'title',
  ])
  @IsOptional()
  sortBy?:
    | 'pricePerDay'
    | 'availableFrom'
    | 'beds'
    | 'bathrooms'
    | 'floor'
    | 'roomNumber'
    | 'title' = 'availableFrom';

  @ApiPropertyOptional({ example: 2 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  categoryId?: number;

  @ApiPropertyOptional({ example: true })
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : undefined,
  )
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiPropertyOptional({ example: 2, description: 'Minimum beds' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  minBeds?: number;

  @ApiPropertyOptional({ example: 1, description: 'Minimum bathrooms' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  minBathrooms?: number;

  @ApiPropertyOptional({
    example: 0,
    description: 'Minimum floor (0 = ground)',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  minFloor?: number;

  @ApiPropertyOptional({
    example: 100000,
    description: 'Minimum price per day',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  minPrice?: number;

  @ApiPropertyOptional({
    example: 500000,
    description: 'Maximum price per day',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  maxPrice?: number;

  @ApiPropertyOptional({
    example: '2025-10-10T00:00:00.000Z',
    description: 'Room must be available on/after this date',
  })
  @IsDateString()
  @IsOptional()
  availableFromGte?: string;

  @ApiPropertyOptional({
    example: 'Deluxe',
    description: 'Search in title/description (case-insensitive, contains)',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
