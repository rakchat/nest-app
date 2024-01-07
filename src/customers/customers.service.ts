import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/utils/entity';
import {
  CCustomer,
  CCustomers,
  CCustomerSearch,
  CustomerDto,
} from './dto/customers.dto';

const path = 'customers';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async findAll(search: CCustomerSearch) {
    const { size, query, sortBy, orderBy, projectName } = search;

    const builder = this.customersRepository.createQueryBuilder(path);

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

    if (sortBy || orderBy) {
      builder.orderBy(sortBy ?? 'id', orderBy);
    }

    const result = new CCustomers();

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

  findOne(id: number): Promise<CCustomer> {
    return this.customersRepository.findOneBy({ id });
  }

  async create(payload: CustomerDto) {
    const res = await this.customersRepository.save(payload);
    return { data: res, message: `Created ${path} successfully.` };
  }

  async update(id: number, payload: CustomerDto) {
    await this.customersRepository.update(id, payload);
    return { message: `Updated ${path} successfully.` };
  }

  async remove(id: number) {
    await this.customersRepository.delete(id);
    return { message: `Deleted ${path} successfully.` };
  }
}
