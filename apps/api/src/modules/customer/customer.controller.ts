import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
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
import {
  UpdateCustomerDto,
  UpdateCustomerSchema,
} from './dtos/update-customer.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard, RoleGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'idProof', maxCount: 1 },
      { name: 'signature', maxCount: 1 },
    ]),
  )
  @HttpCode(HttpStatus.CREATED)
  async createCustomer(
    @UploadedFiles()
    files: { idProof; signature },
    @Body(new ValidationPipe(CreateCustomerSchema)) body: CreateCustomerDto,
  ) {
    const data = await this.customerService.createCustomer(files, body);
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
    return { items, pagination: pagination };
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getCustomerById(@Param('id') id: string) {
    const data = await this.customerService.getCustomerById(id);
    return { data };
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateCustomer(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateCustomerSchema)) body: UpdateCustomerDto,
  ) {
    const data = await this.customerService.updateCustomer(id, body);

    return {
      data,
      message: CUSTOMER_SUCCESS_MSG.UPDATED,
    };
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteCustomer() {
    return { message: CUSTOMER_SUCCESS_MSG.DELETED };
  }
}
