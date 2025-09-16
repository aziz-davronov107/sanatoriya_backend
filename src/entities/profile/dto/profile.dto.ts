import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ example: 'Azizbek' })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiProperty({ example: 'Davronov' })
  @IsOptional()
  @IsString()
  lastname?: string;

}

export class UpdatePasswordDto {
  @ApiProperty({ example: 'newPassword456' })
  @IsString()
  @MinLength(6)
  newPassword: string;
  
    @ApiProperty({ description: 'Tasdiqlash коди (OTP)' })
    @IsString()
  otp: string;
  
}
