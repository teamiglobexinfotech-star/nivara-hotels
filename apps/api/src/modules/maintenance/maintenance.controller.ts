import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser, Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiListResponse, apiResponse } from '../../common/helpers';
import { ValidationPipe } from '../../common/pipes';

import { CreateReportDto, CreateReportSchema } from './dtos/create-report.dto';
import { GetReportsDto, GetReportsSchema } from './dtos/get-reports.dto';
import { MAINTENANCE_SUCCESS_MSG } from './maintenance.constants';
import { MaintenanceService } from './maintenance.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Post('reports')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @CurrentUser('id') userId: string,
    @Body(new ValidationPipe(CreateReportSchema)) body: CreateReportDto,
  ) {
    const data = await this.maintenanceService.create(userId, body);
    return apiResponse({ data, message: MAINTENANCE_SUCCESS_MSG.CREATED });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get('reports')
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query(new ValidationPipe(GetReportsSchema)) query: GetReportsDto,
  ) {
    const { data, meta } = await this.maintenanceService.getAll(query);
    return apiListResponse({ data, meta });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get('reports/stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    const data = await this.maintenanceService.getStats();
    return apiResponse({ data });
  }

  @Roles('ADMIN', 'MANAGER', 'STAFF', 'CUSTOMER')
  @Get('reports/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    const data = await this.maintenanceService.getById(id);
    return apiResponse({ data });
  }

  @Roles('ADMIN')
  @Delete('reports/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    const data = await this.maintenanceService.delete(id);
    return apiResponse({ data, message: MAINTENANCE_SUCCESS_MSG.DELETED });
  }
}
