import { Test, TestingModule } from '@nestjs/testing';

jest.mock('../../db/prisma/prisma.service', () => ({
  PrismaService: class PrismaService {},
}));

import { PrismaService } from '../../db/prisma/prisma.service';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  const prismaService = {
    room: { count: jest.fn() },
    booking: { count: jest.fn(), findMany: jest.fn() },
    invoice: { aggregate: jest.fn() },
    payment: { aggregate: jest.fn() },
    maintenanceReport: { findMany: jest.fn() },
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('returns management stats from room and booking counts', async () => {
    prismaService.room.count
      .mockResolvedValueOnce(100)
      .mockResolvedValueOnce(72);
    prismaService.booking.count
      .mockResolvedValueOnce(12)
      .mockResolvedValueOnce(8)
      .mockResolvedValueOnce(6);

    await expect(service.getManagementStats()).resolves.toEqual([
      {
        id: 'occupancy-rate',
        title: 'Occupancy Rate',
        value: '72%',
        description: '72 of 100 active rooms are occupied',
        icon: 'BedDouble',
        link: '/dashboard/rooms',
      },
      {
        id: 'todays-arrivals',
        title: "Today's Arrivals",
        value: '12',
        description: 'Guests scheduled to check in today',
        icon: 'LogIn',
        link: '/dashboard/bookings',
      },
      {
        id: 'todays-departures',
        title: "Today's Departures",
        value: '8',
        description: 'Guests scheduled to check out today',
        icon: 'LogOut',
        link: '/dashboard/bookings',
      },
      {
        id: 'pending-bookings',
        title: 'Pending Bookings',
        value: '6',
        description: 'Bookings awaiting confirmation',
        icon: 'Clock3',
        link: '/dashboard/bookings',
      },
    ]);
  });

  it('combines management stats, schedule, and attention items', async () => {
    const stats = [
      {
        id: 'occupancy-rate',
        icon: 'BedDouble',
        title: 'Occupancy Rate',
        value: '72%',
        description: '72 rooms occupied',
      },
    ];
    const schedule = { arrivals: [], departures: [] };
    const attentionItems = [
      {
        id: 'att-001',
        item: 'AC issue',
        type: 'HVAC',
        room: '204',
        priority: 'HIGH',
        assignedTo: 'Rajesh Kumar',
      },
    ];
    jest.spyOn(service, 'getManagementStats').mockResolvedValue(stats);
    jest.spyOn(service, 'getTodaysSchedule').mockResolvedValue(schedule);
    jest.spyOn(service, 'getAttentionItems').mockResolvedValue(attentionItems);

    await expect(service.getManagementDashboard()).resolves.toEqual({
      stats,
      schedule,
      attentionItems,
    });
  });

  it('returns zero occupancy when there are no active rooms', async () => {
    prismaService.room.count.mockResolvedValueOnce(0).mockResolvedValueOnce(0);
    prismaService.booking.count
      .mockResolvedValueOnce(0)
      .mockResolvedValueOnce(0)
      .mockResolvedValueOnce(0);

    const [occupancyStat] = await service.getManagementStats();

    expect(occupancyStat.value).toBe('0%');
    expect(occupancyStat.description).toBe('0 of 0 active rooms are occupied');
  });

  it('returns today arrivals and departures from one booking query', async () => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    prismaService.booking.findMany.mockResolvedValue([
      {
        id: 'arr-001',
        bookingReference: 'BK-2001',
        checkInDate: today,
        checkOutDate: tomorrow,
        status: 'CONFIRMED',
        customer: { fullName: 'William Johnson' },
        bookingRooms: [{ assignedRoom: { roomNumber: '102' } }],
      },
      {
        id: 'dep-001',
        bookingReference: 'BK-1001',
        checkInDate: tomorrow,
        checkOutDate: today,
        status: 'CHECKED_OUT',
        customer: { fullName: 'John Smith' },
        bookingRooms: [{ assignedRoom: { roomNumber: '101' } }],
      },
    ]);

    const result = await service.getTodaysSchedule();

    expect(result.arrivals).toEqual([
      {
        id: 'arr-001',
        booking: 'BK-2001',
        customer: 'William Johnson',
        room: '102',
        checkIn: today.toISOString().slice(0, 10),
        status: 'CONFIRMED',
      },
    ]);
    expect(result.departures).toEqual([
      {
        id: 'dep-001',
        booking: 'BK-1001',
        customer: 'John Smith',
        room: '101',
        checkOut: today.toISOString().slice(0, 10),
        status: 'CHECKED_OUT',
      },
    ]);
    expect(prismaService.booking.findMany).toHaveBeenCalledTimes(1);
  });

  it('returns the highest-priority unresolved maintenance items', async () => {
    prismaService.maintenanceReport.findMany.mockResolvedValue([
      {
        id: 'att-001',
        description: 'Air conditioning not cooling',
        category: 'HVAC',
        priority: 'HIGH',
        room: { roomNumber: '204' },
        assignee: { fullName: 'Rajesh Kumar' },
      },
    ]);

    await expect(service.getAttentionItems()).resolves.toEqual([
      {
        id: 'att-001',
        item: 'Air conditioning not cooling',
        type: 'HVAC',
        room: '204',
        priority: 'HIGH',
        assignedTo: 'Rajesh Kumar',
      },
    ]);
  });

  it('returns customer KPIs, recent bookings, and the next upcoming stay', async () => {
    const checkInDate = new Date('2026-10-03T15:00:00.000Z');
    const checkOutDate = new Date('2026-10-05T11:00:00.000Z');
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
    const booking = {
      id: 'booking-001',
      bookingReference: 'BK-2001',
      checkInDate,
      checkOutDate,
      status: BookingStatus.CONFIRMED,
      bookingRooms: [{ assignedRoom: { roomNumber: '102' } }],
    };
    prismaService.booking.findMany
      .mockResolvedValueOnce([booking])
      .mockResolvedValueOnce([booking]);

    await expect(service.getCustomerDashboard('customer-001')).resolves.toEqual(
      {
        stats: [
          expect.objectContaining({ id: 'upcoming-stays', value: 1 }),
          expect.objectContaining({ id: 'active-stays', value: 0 }),
          expect.objectContaining({ id: 'total-bookings', value: 6 }),
          expect.objectContaining({ id: 'pending-payment', value: '₹4,500' }),
        ],
        recentBookings: [
          {
            id: 'booking-001',
            booking: 'BK-2001',
            room: '102',
            checkIn: '2026-10-03',
            checkOut: '2026-10-05',
            status: BookingStatus.CONFIRMED,
          },
        ],
        upcomingStay: {
          id: 'booking-001',
          booking: 'BK-2001',
          room: '102',
          checkIn: '2026-10-03',
          checkOut: '2026-10-05',
          status: BookingStatus.CONFIRMED,
        },
      },
    );
  });
});
