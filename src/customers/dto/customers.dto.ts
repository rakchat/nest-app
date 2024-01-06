import { ApiProperty } from '@nestjs/swagger';
import { CustomerDto } from './customer.dto';

export class CustomersDto {
  data: CustomerDto[];

  @ApiProperty()
  currentPage?: number;

  @ApiProperty()
  perPage?: number;

  @ApiProperty()
  totalPage?: number;

  @ApiProperty()
  total?: number;

  @ApiProperty()
  id: number;
}
