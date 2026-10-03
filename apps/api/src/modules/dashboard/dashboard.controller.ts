import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser, Roles } from '../../common/decorators';
import { AuthGuard, RoleGuard } from '../../common/guards';
import { apiResponse } from '../../common/helpers';

import { DashboardService } from './dashboard.service';

@UseGuards(AuthGuard, RoleGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Roles('ADMIN', 'MANAGER', 'STAFF')
  @Get('management')
  @HttpCode(HttpStatus.OK)
  async getManagementDashboard() {
    const data = await this.dashboardService.getManagementDashboard();
    return apiResponse({ data });
  }

  @Roles('CUSTOMER')
  @Get('customer')
  @HttpCode(HttpStatus.OK)
  async getCustomerDashboard(@CurrentUser('id') customerId: string) {
    const data = await this.dashboardService.getCustomerDashboard(customerId);
    return apiResponse({ data });
  }
}
