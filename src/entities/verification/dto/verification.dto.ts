// src/modules/verification/dto/verification.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsEmail, IsString, Length, Matches } from 'class-validator';
import { EverifationsTypes } from 'src/common/types/verification';

// Faqat 2 tur qoldi
export enum LimitedVerificationTypes {
  REGISTER = EverifationsTypes.REGISTER,
  EMAIL_PASSWORD = EverifationsTypes.EMAIL_PASSWORD,
}

export class SendOtpDto {
  @ApiProperty({ enum: LimitedVerificationTypes })
  @IsEnum(LimitedVerificationTypes)
  type: LimitedVerificationTypes;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
}

export class VerifyOtpDto extends SendOtpDto {
  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6)
  @Matches(/^\d{6}$/)
  otp: string;
}
