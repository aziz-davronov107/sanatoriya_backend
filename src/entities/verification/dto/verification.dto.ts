// src/modules/verification/dto/verification.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsEmail, IsString, Length, Matches } from 'class-validator';
import { EverifationsTypes } from 'src/common/types/verification';

// Faqat docs uchun (enum EMAS)
export const LimitedVerificationTypes = {
  REGISTER: EverifationsTypes.REGISTER,
  EMAIL_PASSWORD: EverifationsTypes.EMAIL_PASSWORD,
} as const;

export class SendOtpDto {
  @ApiProperty({ enum: EverifationsTypes }) // <-- Swagger’da ham shu ko‘rinsin
  @IsEnum(EverifationsTypes) // <-- Validatsiya ham shu enumga qaraydi
  type: EverifationsTypes; // <-- Asosiy fix

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
