import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BaseTableSearch } from 'src/utils/helper';

// ~ extends BaseTableSearch for table query (page, size)
export class CustomerSearch extends BaseTableSearch {
  @ApiPropertyOptional()
  @IsOptional()
  projectName: string;
}

export class CustomerDto {
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  projectName: string;
}
