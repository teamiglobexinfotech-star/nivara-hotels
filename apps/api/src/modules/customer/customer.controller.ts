import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard, RoleGuard } from '../../common/guards';
import { ValidationPipe } from '../../common/pipes';
import { Roles } from '../../common/decorators';
import { CustomerService } from './customer.service';
import {
  CreateCustomerDto,
  CreateCustomerSchema,
} from './dtos/create-customer.dto';
import { CUSTOMER_SUCCESS_MSG } from './customer.constants';
import { GetCustomersDto, GetCustomersSchema } from './dtos/get-customers.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateCustomerSchema)) body: CreateCustomerDto,
  ) {
    const data = await this.customerService.create(body);

    return { data, message: CUSTOMER_SUCCESS_MSG.CREATED };
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getCustomers(
    @Query(new ValidationPipe(GetCustomersSchema)) query: GetCustomersDto,
  ) {
    const { items, pagination } =
      await this.customerService.getCustomers(query);
    return { data: items, pagination: pagination };
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getCustomerById(@Param('id') id: string) {
    const data = await this.customerService.getCustomerById(id);
    return { data };
  }
}
