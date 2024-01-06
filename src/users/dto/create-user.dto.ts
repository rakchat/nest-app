import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  id: number;

  @ApiProperty({ type: String, description: 'firstName' })
  firstName: string;

  @ApiProperty({ type: String, description: 'lastName' })
  lastName: string;

  isActive: boolean;
}
