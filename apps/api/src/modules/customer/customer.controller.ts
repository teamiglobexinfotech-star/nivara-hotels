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
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiListResponse, apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import {
  CreateCustomerDto,
  CreateCustomerSchema,
} from './dtos/create-customer.dto';
import { GetCustomersDto, GetCustomersSchema } from './dtos/get-customers.dto';
import {
  UpdateCustomerDto,
  UpdateCustomerSchema,
} from './dtos/update-customer.dto';
import { CUSTOMER_SUCCESS_MSG } from './customer.constants';
import { CustomerService } from './customer.service';

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
  async create(
    @UploadedFiles()
    files: { idProof; signature },
    @Body(new ValidationPipe(CreateCustomerSchema)) body: CreateCustomerDto,
  ) {
    const data = await this.customerService.create(files, body);
    return apiResponse({ data, message: CUSTOMER_SUCCESS_MSG.CREATED });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query(new ValidationPipe(GetCustomersSchema)) query: GetCustomersDto,
  ) {
    const { data, meta } = await this.customerService.getAll(query);
    return apiListResponse({ data, meta });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    const data = await this.customerService.getById(id);
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe(UpdateCustomerSchema)) body: UpdateCustomerDto,
  ) {
    const data = await this.customerService.update(id, body);

    return apiResponse({
      data,
      message: CUSTOMER_SUCCESS_MSG.UPDATED,
    });
  }

  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    const data = await this.customerService.delete(id);
    return apiResponse({ data, message: CUSTOMER_SUCCESS_MSG.DELETED });
  }
}
