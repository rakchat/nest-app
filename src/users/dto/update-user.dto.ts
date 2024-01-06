import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  id: number;

  @ApiProperty({ type: String, description: 'firstName' })
  firstName: string;

  @ApiProperty({ type: String, description: 'lastName' })
  lastName: string;

  @ApiProperty({ type: Boolean })
  isActive: boolean;
}
