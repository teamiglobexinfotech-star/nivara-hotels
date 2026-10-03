import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

jest.mock('../../db/prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { PrismaService } from '../../db/prisma/prisma.service';
import { GetCustomersDto } from './dtos/get-customers.dto';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  const prismaService = {
    user: { findMany: jest.fn(), findFirst: jest.fn(), count: jest.fn() },
    booking: { groupBy: jest.fn(), count: jest.fn() },
    invoice: { aggregate: jest.fn() },
    payment: { aggregate: jest.fn() },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('returns customers with booking totals and spend', async () => {
    prismaService.$transaction.mockResolvedValue([
      [
        {
          id: 'customer-001',
          fullName: 'Taylor Smith',
          email: 'taylor@example.com',
          phone: '1234567890',
          isActive: true,
        },
      ],
      1,
    ]);
    prismaService.booking.groupBy.mockResolvedValue([
      {
        customerId: 'customer-001',
        _count: { _all: 3 },
        _sum: { totalAmount: 12500 },
      },
    ]);

    await expect(
      service.getAll({ page: 1, limit: 10 } as GetCustomersDto),
    ).resolves.toEqual({
      data: [
        {
          id: 'customer-001',
          fullName: 'Taylor Smith',
          email: 'taylor@example.com',
          phone: '1234567890',
          totalBookings: 3,
          totalSpend: 12500,
          isActive: true,
        },
      ],
      meta: { limit: 10, page: 1, total: 1, totalPages: 1 },
    });
  });

  it('returns customer detail with profile and booking totals', async () => {
    prismaService.user.findFirst.mockResolvedValue({
      id: 'customer-001',
      fullName: 'Taylor Smith',
      email: 'taylor@example.com',
      phone: '1234567890',
      isActive: true,
      customerProfile: {
        idProofNumber: 'ID-12345',
        address: '12 Main Street',
      },
    });
    prismaService.booking.groupBy.mockResolvedValue([
      {
        customerId: 'customer-001',
        _count: { _all: 3 },
        _sum: { totalAmount: 12500 },
      },
    ]);

    await expect(service.getById('customer-001')).resolves.toEqual({
      id: 'customer-001',
      fullName: 'Taylor Smith',
      email: 'taylor@example.com',
      phone: '1234567890',
      totalBookings: 3,
      totalSpend: 12500,
      isActive: true,
      address: '12 Main Street',
      idProofNumber: 'ID-12345',
    });
  });

  it('throws when the customer does not exist', async () => {
    prismaService.user.findFirst.mockResolvedValue(null);

    await expect(service.getById('missing-id')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('returns customer dashboard KPIs with pending invoice balance', async () => {
    prismaService.booking.count
      .mockResolvedValueOnce(1)
      .mockResolvedValueOnce(0)
      .mockResolvedValueOnce(6);
    prismaService.invoice.aggregate.mockResolvedValue({
      _sum: { totalAmount: 5000 },
    });
    prismaService.payment.aggregate.mockResolvedValue({
      _sum: { amount: 500 },
    });

    await expect(service.getDashboardStats('customer-001')).resolves.toEqual([
      {
        id: 'upcoming-stays',
        icon: 'CalendarCheck',
        title: 'Upcoming Stay',
        value: 1,
        description: 'Confirmed stays starting today or later',
      },
      {
        id: 'active-stays',
        icon: 'BedDouble',
        title: 'Active Stay',
        value: 0,
        description: 'Currently checked-in stays',
      },
      {
        id: 'total-bookings',
        icon: 'CalendarDays',
        title: 'Total Bookings',
        value: 6,
        description: 'All your bookings',
      },
      {
        id: 'pending-payment',
        icon: 'Wallet',
        title: 'Pending Payment',
        value: '₹4,500',
        description: 'Outstanding invoice balance',
      },
    ]);
  });
});
