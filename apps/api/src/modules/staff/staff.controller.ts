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

import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiListResponse, apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import { CreateStaffDto, CreateStaffSchema } from './dtos/create-staff.dto';
import { GetStaffDto, GetStaffSchema } from './dtos/get-staff.dto';
import { STAFF_SUCCESS_MSG } from './staff.constants';
import { StaffService } from './staff.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Roles('ADMIN', 'MANAGER')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe(CreateStaffSchema)) body: CreateStaffDto,
  ) {
    const data = await this.staffService.create(body);
    return apiResponse({ data, message: STAFF_SUCCESS_MSG.CREATED });
  }

  @Roles('ADMIN', 'MANAGER')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(@Query(new ValidationPipe(GetStaffSchema)) query: GetStaffDto) {
    const { data, meta } = await this.staffService.getAll(query);
    return apiListResponse({ data, meta });
  }

  @Roles('ADMIN', 'MANAGER')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    const data = await this.staffService.getById(id);
    return apiResponse({ data });
  }
}
