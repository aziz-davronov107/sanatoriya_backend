import { ApiProperty } from '@nestjs/swagger';

export class LikeDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  like: boolean;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  accommodationId: string;
}
