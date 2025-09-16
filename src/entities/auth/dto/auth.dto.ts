export enum UserRoleDto {
  SALER = 'SALER',
  USER = 'USER',
}
import { IsEnum, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';


export class CreateDto {
  @ApiProperty({
    description: 'Email',
    example: 'user@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Parol (kamida 6 ta belgidan iborat)',
    example: 'StrongP@ssw0rd',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Ism',
    example: 'Azizbek',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    description: 'Familiya',
    example: 'Davronov',
  })
  @IsString()
  lastname: string;

  @ApiProperty({ description: 'Tasdiqlash коди (OTP)' })
  @IsString()
  otp: string;
  
  @ApiProperty({ enum: UserRoleDto, description: 'Foydalanuvchi roli (faqat SALER yoki USER)', example: 'USER' })
  @IsEnum(UserRoleDto)
  role: UserRoleDto;
}

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    example: 'user@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Parol (kamida 6 ta belgidan iborat)',
    example: 'yandiev',
  })
  @IsString()
  password: string;
}
