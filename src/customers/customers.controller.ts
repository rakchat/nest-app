import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CustomerDto, CustomerSearch } from './dto/customers.dto';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly CustomersService: CustomersService) {}

  @Get()
  findAll(@Query() query: CustomerSearch) {
    query.size = query.size || 10;

    return this.CustomersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.CustomersService.findOne(+id);
  }

  @Post()
  @ApiBody({ type: CustomerDto })
  create(@Body() payload: CustomerDto) {
    return this.CustomersService.create(payload);
  }

  @Put(':id')
  updatePut(@Param('id') id: number, @Body() payload: CustomerDto) {
    return this.CustomersService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.CustomersService.remove(+id);
  }
}
