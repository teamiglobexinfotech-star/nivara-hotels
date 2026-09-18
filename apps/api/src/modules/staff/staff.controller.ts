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
import { ValidationPipe } from '../../common/pipes';
import { Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { StaffService } from './staff.service';
import { STAFF_SUCCESS_MSG } from './staff.constants';
import { CreateStaffDto, CreateStaffSchema } from './dtos/create-staff.dto';
import { GetStaffDto, GetStaffSchema } from './dtos/get-staff.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Roles('ADMIN', 'MANAGER')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createStaff(
    @Body(new ValidationPipe(CreateStaffSchema)) body: CreateStaffDto,
  ) {
    const data = await this.staffService.createStaff(body);

    return { data, message: STAFF_SUCCESS_MSG.CREATED };
  }

  @Roles('ADMIN', 'MANAGER')
  @Get()
  @HttpCode(HttpStatus.OK)
  async getStaff(
    @Query(new ValidationPipe(GetStaffSchema)) query: GetStaffDto,
  ) {
    const { items, pagination } = await this.staffService.getStaff(query);
    return { data: items, pagination: pagination };
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getStaffById(@Param('id') id: string) {
    const data = await this.staffService.getStaffById(id);
    return { data };
  }
}
