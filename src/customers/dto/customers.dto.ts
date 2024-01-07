import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BaseTableSearch } from 'src/utils/helper';

export class CCustomer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}

export class CCustomers {
  data: CCustomer[];

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

// ~ extends BaseTableSearch for table query (page, size)
export class CCustomerSearch extends BaseTableSearch {
  @ApiPropertyOptional()
  @IsOptional()
  projectName: string;
}

export class CustomerDto {
  id: number;

  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @ApiProperty({ type: String, description: 'description' })
  description: string;

  @ApiProperty({ type: String, description: 'projectName' })
  projectName: string;
}
