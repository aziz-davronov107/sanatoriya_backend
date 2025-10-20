import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDto {
  @ApiProperty({
    description: 'Email',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Tasdiqlash kodi (OTP)', example: '123456' })
  @IsString()
  @IsNotEmpty()
  otp!: string;
}
