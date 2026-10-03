import { Test, TestingModule } from '@nestjs/testing';

jest.mock('../../common/guards', () => ({
  AuthGuard: class AuthGuard {},
  RoleGuard: class RoleGuard {},
}));

import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

describe('BookingController', () => {
  let controller: BookingController;
  const bookingService = { getMyBookings: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [{ provide: BookingService, useValue: bookingService }],
    }).compile();

    controller = module.get<BookingController>(BookingController);
  });

  it('returns my bookings in the standard API response', async () => {
    const data = [{ id: 'booking-001', booking: 'BK-2001' }];
    bookingService.getMyBookings.mockResolvedValue(data);

    await expect(
      controller.getMyBookings('customer-001', {} as never),
    ).resolves.toEqual({ data });
  });
});
