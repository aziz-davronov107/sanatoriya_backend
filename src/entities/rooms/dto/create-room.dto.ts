// src/rooms/dto/create-room.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  Min,
  IsString,
  Length,
  IsDateString,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

// If you want stricter typing for JSON, you can refine this later.
export type Features = Record<string, any> | any[];

export class CreateRoomDto {
  @ApiProperty({ example: 101, description: 'Unique room number' })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  roomNumber: number;

  @ApiProperty({
    example: 350000,
    description: 'Price per day (in UZS or your unit)',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  pricePerDay: number;

  @ApiProperty({ example: 2 })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  beds: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  bathrooms: number;

  @ApiProperty({ example: 3, description: 'Floor number' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  floor: number;

  @ApiProperty({ example: 'Deluxe Twin Room' })
  @IsString()
  @Length(2, 120)
  title: string;

  @ApiProperty({
    example: 'Spacious twin room with city view, close to elevator.',
  })
  @IsString()
  @Length(0, 2000)
  description: string;

  @ApiPropertyOptional({
    description: 'Flexible JSON field (amenities, tags, etc.)',
    example: { wifi: true, view: 'city', extras: ['kettle', 'hairdryer'] },
  })
  @IsObject()
  features: Features;

  @ApiProperty({ example: 2, description: 'Room category ID (FK)' })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  categoryId: number;

  @ApiProperty({
    example: '2025-10-10T00:00:00.000Z',
    description: 'ISO 8601 date when the room becomes available',
  })
  @IsDateString()
  availableFrom: string; // convert to Date in service: new Date(dto.availableFrom)
}
