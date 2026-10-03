import { Test, TestingModule } from '@nestjs/testing';

jest.mock('../../common/guards', () => ({
  AuthGuard: class AuthGuard {},
  RoleGuard: class RoleGuard {},
}));

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

describe('DashboardController', () => {
  let controller: DashboardController;
  const dashboardService = {
    getManagementDashboard: jest.fn(),
    getCustomerDashboard: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [{ provide: DashboardService, useValue: dashboardService }],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  it('returns management data in one standard API response', async () => {
    const data = {
      stats: [{ id: 'occupancy-rate', value: '72%' }],
      schedule: {
        arrivals: [{ id: 'arr-001', booking: 'BK-2001' }],
        departures: [{ id: 'dep-001', booking: 'BK-1001' }],
      },
      attentionItems: [{ id: 'att-001', item: 'Air conditioning not cooling' }],
    };
    dashboardService.getManagementDashboard.mockResolvedValue(data);

    await expect(controller.getManagementDashboard()).resolves.toEqual({
      data,
    });
  });

  it('returns customer dashboard data in the standard API response', async () => {
    const data = {
      stats: [],
      recentBookings: [],
      upcomingStay: null,
    };
    dashboardService.getCustomerDashboard.mockResolvedValue(data);

    await expect(
      controller.getCustomerDashboard('customer-001'),
    ).resolves.toEqual({ data });
  });
});
