import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { SearchCustomers } from './dto/customers-search.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll(@Query() query: SearchCustomers) {
    query.size = query.size || 10;

    return this.customersService.findAll(query);
  }
}
