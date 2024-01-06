import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, IsIn } from 'class-validator';

abstract class BasicData {
  active?: boolean;
  deleted?: boolean;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
}

enum OrderBy {
  DESC = 'DESC',
  ASC = 'ASC',
}

export class Search extends BasicData {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({ type: 'enum', enum: OrderBy })
  @IsOptional()
  @IsString()
  @IsIn(['DESC', 'ASC'])
  orderBy?: 'DESC' | 'ASC';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  query?: string;
}
