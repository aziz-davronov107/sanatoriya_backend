import { PartialType } from '@nestjs/swagger';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    example: 'Azizbek Azizbekov',
    description: 'Full name of the user',
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({
    example: 'Fergana, Uzbekistan',
    description: 'Address of the user',
  })
  @IsOptional()
  @IsString()
  address?: string;
}
