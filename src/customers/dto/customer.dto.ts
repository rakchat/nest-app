import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
