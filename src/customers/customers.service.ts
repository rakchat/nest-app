import { Customer } from './entities/customers.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchCustomers } from './dto/customers-search.dto';
import { CustomersDto } from './dto/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async findAll(search: SearchCustomers) {
    const { size, query, sortBy, orderBy, projectName } = search;

    const builder = this.customersRepository.createQueryBuilder('customers');

    // ~ LIKE
    // if (query) {
    //   builder.where('customers.name LIKE :search', { search: `%${query}%` });
    // }
    // ~ %LIKE%
    if (query) {
      builder.where(
        `customers.name LIKE '%${query}%' or customers.description LIKE '%${query}%'`,
      );
    }

    if (projectName) {
      const projectNameList: string[] = projectName.split(',');
      builder.andWhere('customers.projectName IN (:...projectName)', {
        projectName: projectNameList,
      });
    }

    if (sortBy && orderBy) {
      builder.orderBy(sortBy, orderBy);
    }

    const result = new CustomersDto();

    const page: number = parseInt(search.page as any) || 1;
    const perPage: number = +size;
    const total = await builder.getCount();
    builder.offset((page - 1) * perPage).limit(perPage);
    const data = await builder.getMany();

    result.currentPage = page;
    result.total = total;
    result.perPage = perPage;
    result.totalPage = Math.ceil(total / size ?? 10);
    result.data = data;

    return result;
  }
}
