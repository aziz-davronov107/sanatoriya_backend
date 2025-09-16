
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString, IsOptional, IsNumber, IsObject } from 'class-validator';

export enum AccommodationStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}
export enum AccommodationListingType {
  RENT = 'RENT',
  SALE = 'SALE',
}
export enum AccommodationPriceUnit {
  PER_NIGHT = 'PER_NIGHT',
  PER_MONTH = 'PER_MONTH',
  TOTAL = 'TOTAL',
}

export class CreateAccommodationDto {
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ enum: AccommodationStatus })
  @IsEnum(AccommodationStatus)
  status: AccommodationStatus;

  @ApiProperty({ enum: AccommodationListingType })
  @IsEnum(AccommodationListingType)
  listingType: AccommodationListingType;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  description: string;


  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsNumber({}, { message: 'price must be a number' })
  price: number;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty({ enum: AccommodationPriceUnit })
  @IsEnum(AccommodationPriceUnit)
  priceUnit: AccommodationPriceUnit;

  @ApiProperty()
  @IsNumber()
  discount: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  buildYear?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  documents?: any;

  @ApiProperty()
  @IsNumber()
  categoryId: number;
}




export class UpdateAccommodationDto extends PartialType(CreateAccommodationDto) {}
