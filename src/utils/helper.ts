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
  ASC = 'ASC',
  DESC = 'DESC',
}

export class BaseTableSearch extends BasicData {
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
  @IsIn(['ASC', 'DESC'])
  orderBy?: 'ASC' | 'DESC';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  query?: string;
}

export interface IBaseTable<DT> {
  data: DT;
  currentPage?: number;
  perPage?: number;
  totalPage?: number;
  total?: number;
}
