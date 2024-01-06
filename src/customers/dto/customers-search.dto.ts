import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Search } from 'src/helper/dto/search.dto';

// ~ extends Search for table query (page, size)
export class SearchCustomers extends Search {
  @ApiPropertyOptional()
  @IsOptional()
  projectName: string;
}
