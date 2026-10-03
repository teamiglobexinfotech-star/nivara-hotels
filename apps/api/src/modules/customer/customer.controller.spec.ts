import { Test, TestingModule } from '@nestjs/testing';

jest.mock('../../common/guards', () => ({
  AuthGuard: class AuthGuard {},
  RoleGuard: class RoleGuard {},
}));

jest.mock('../../db/prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let controller: CustomerController;
  const customerService = {
    getDashboardStats: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [{ provide: CustomerService, useValue: customerService }],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns customer dashboard KPIs in the standard response', async () => {
    const data = [{ id: 'upcoming-stays', value: 1 }];
    customerService.getDashboardStats.mockResolvedValue(data);

    await expect(controller.getDashboardStats('customer-001')).resolves.toEqual(
      { data },
    );
  });
});
