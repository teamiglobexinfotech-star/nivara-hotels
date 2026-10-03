import { Test, TestingModule } from '@nestjs/testing';

jest.mock('../../db/prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { PrismaService } from '../../db/prisma/prisma.service';
import { GetMyBookingsDto } from './dtos/get-my-bookings.dto';
import { BookingService } from './booking.service';

describe('BookingService', () => {
  let service: BookingService;
  const prismaService = {
    booking: { findMany: jest.fn() },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('returns mapped bookings filtered for the authenticated customer', async () => {
    const checkInDate = new Date('2026-10-10T15:00:00.000Z');
    const checkOutDate = new Date('2026-10-12T11:00:00.000Z');
    prismaService.booking.findMany.mockResolvedValue([
      {
        id: 'booking-001',
        bookingReference: 'BK-2001',
        checkInDate,
        checkOutDate,
        totalAmount: 4500,
        status: 'CONFIRMED',
        bookingRooms: [{ assignedRoom: { roomNumber: '102' } }],
      },
    ]);

    await expect(
      service.getMyBookings('customer-001', {
        search: 'BK-2001',
        status: 'CONFIRMED',
      } as GetMyBookingsDto),
    ).resolves.toEqual([
      {
        id: 'booking-001',
        booking: 'BK-2001',
        room: '102',
        checkIn: '2026-10-10',
        checkOut: '2026-10-12',
        amount: 4500,
        status: 'CONFIRMED',
      },
    ]);
    expect(prismaService.booking.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          customerId: 'customer-001',
          status: 'CONFIRMED',
        }),
      }),
    );
  });
});
