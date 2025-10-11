import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl, Length } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Sharh matni',
    example: 'Juda zo‘r xizmat! Yana buyurtma beraman.',
    minLength: 3,
    maxLength: 2000,
  })
  @IsString()
  @Length(3, 2000)
  description: string;
}
