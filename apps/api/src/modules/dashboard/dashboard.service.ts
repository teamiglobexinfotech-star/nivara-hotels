import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../db/prisma/prisma.service';
import { BookingStatus, KpiStat, MaintenanceReportStatus } from '../../types';

import {
  AttentionItem,
  CustomerDashboard,
  CustomerDashboardBooking,
  ManagementDashboard,
  TodaysArrival,
  TodaysDeparture,
  TodaysSchedule,
} from './dashboard.types';

@Injectable()
export class DashboardService {
  constructor(private readonly prismaService: PrismaService) {}

  async getManagementDashboard(): Promise<ManagementDashboard> {
    const [stats, schedule, attentionItems] = await Promise.all([
      this.getManagementStats(),
      this.getTodaysSchedule(),
      this.getAttentionItems(),
    ]);

    return { stats, schedule, attentionItems };
  }

  private async getManagementStats(): Promise<KpiStat[]> {
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const startOfNextDay = new Date(startOfDay);
    startOfNextDay.setDate(startOfNextDay.getDate() + 1);

    const [activeRooms, occupiedRooms, arrivals, departures, pendingBookings] =
      await Promise.all([
        this.prismaService.room.count({
          where: { isActive: true },
        }),
        this.prismaService.room.count({
          where: { isActive: true, occupancyStatus: 'OCCUPIED' },
        }),
        this.prismaService.booking.count({
          where: {
            checkInDate: { gte: startOfDay, lt: startOfNextDay },
            status: 'CONFIRMED',
          },
        }),
        this.prismaService.booking.count({
          where: {
            checkOutDate: { gte: startOfDay, lt: startOfNextDay },
            status: 'CHECKED_IN',
          },
        }),
        this.prismaService.booking.count({
          where: { status: 'PENDING' },
        }),
      ]);

    const occupancyRate = activeRooms
      ? Math.round((occupiedRooms / activeRooms) * 100)
      : 0;

    return [
      {
        id: 'occupancy-rate',
        title: 'Occupancy Rate',
        value: `${occupancyRate}%`,
        description: `${occupiedRooms} of ${activeRooms} active rooms are occupied`,
        icon: 'BedDouble',
        link: '/dashboard/rooms',
      },
      {
        id: 'todays-arrivals',
        title: "Today's Arrivals",
        value: String(arrivals),
        description: 'Guests scheduled to check in today',
        icon: 'LogIn',
        link: '/dashboard/bookings',
      },
      {
        id: 'todays-departures',
        title: "Today's Departures",
        value: String(departures),
        description: 'Guests scheduled to check out today',
        icon: 'LogOut',
        link: '/dashboard/bookings',
      },
      {
        id: 'pending-bookings',
        title: 'Pending Bookings',
        value: String(pendingBookings),
        description: 'Bookings awaiting confirmation',
        icon: 'Clock3',
        link: '/dashboard/bookings',
      },
    ];
  }

  private async getTodaysSchedule(): Promise<TodaysSchedule> {
    const { startOfDay, startOfNextDay } = this.getTodayRange();
    const bookings = await this.prismaService.booking.findMany({
      where: {
        OR: [
          {
            checkInDate: { gte: startOfDay, lt: startOfNextDay },
            status: {
              in: [BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN],
            },
          },
          {
            checkOutDate: { gte: startOfDay, lt: startOfNextDay },
            status: {
              in: [BookingStatus.CHECKED_IN, BookingStatus.CHECKED_OUT],
            },
          },
        ],
      },
      select: {
        id: true,
        bookingReference: true,
        checkInDate: true,
        checkOutDate: true,
        status: true,
        customer: { select: { fullName: true } },
        bookingRooms: {
          select: {
            assignedRoom: { select: { roomNumber: true } },
          },
        },
      },
    });

    const isToday = (date: Date) => date >= startOfDay && date < startOfNextDay;
    const roomLabel = (booking: (typeof bookings)[number]) =>
      booking.bookingRooms
        .map(({ assignedRoom }) => assignedRoom?.roomNumber)
        .filter(Boolean)
        .join(', ') || 'Unassigned';

    const arrivals = bookings
      .filter(
        (booking) =>
          isToday(booking.checkInDate) &&
          (booking.status === BookingStatus.CONFIRMED ||
            booking.status === BookingStatus.CHECKED_IN),
      )
      .sort(
        (first, second) =>
          first.checkInDate.getTime() - second.checkInDate.getTime(),
      )
      .slice(0, 10)
      .map((booking): TodaysArrival => ({
        id: booking.id,
        booking: booking.bookingReference,
        customer: booking.customer.fullName,
        room: roomLabel(booking),
        checkIn: booking.checkInDate.toISOString().slice(0, 10),
        status: booking.status,
      }));

    const departures = bookings
      .filter(
        (booking) =>
          isToday(booking.checkOutDate) &&
          (booking.status === BookingStatus.CHECKED_IN ||
            booking.status === BookingStatus.CHECKED_OUT),
      )
      .sort(
        (first, second) =>
          first.checkOutDate.getTime() - second.checkOutDate.getTime(),
      )
      .slice(0, 10)
      .map((booking): TodaysDeparture => ({
        id: booking.id,
        booking: booking.bookingReference,
        customer: booking.customer.fullName,
        room: roomLabel(booking),
        checkOut: booking.checkOutDate.toISOString().slice(0, 10),
        status: booking.status,
      }));

    return { arrivals, departures };
  }

  private async getAttentionItems(): Promise<AttentionItem[]> {
    const reports = await this.prismaService.maintenanceReport.findMany({
      where: {
        status: {
          notIn: [
            MaintenanceReportStatus.COMPLETED,
            MaintenanceReportStatus.RESOLVED,
          ],
        },
      },
      orderBy: [{ priority: 'desc' }, { reportedAt: 'asc' }],
      take: 10,
      select: {
        id: true,
        description: true,
        category: true,
        priority: true,
        room: { select: { roomNumber: true } },
        assignee: { select: { fullName: true } },
      },
    });

    return reports.map((report) => ({
      id: report.id,
      item: report.description,
      type: report.category,
      room: report.room.roomNumber,
      priority: report.priority,
      assignedTo: report.assignee?.fullName ?? 'Unassigned',
    }));
  }

  async getCustomerDashboard(customerId: string): Promise<CustomerDashboard> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [stats, recentBookings, upcomingBookings] = await Promise.all([
      this.getCustomerStats(customerId, startOfToday),
      this.prismaService.booking.findMany({
        where: { customerId },
        orderBy: { bookedAt: 'desc' },
        take: 5,
        select: {
          id: true,
          bookingReference: true,
          checkInDate: true,
          checkOutDate: true,
          status: true,
          bookingRooms: {
            select: {
              assignedRoom: { select: { roomNumber: true } },
            },
          },
        },
      }),
      this.prismaService.booking.findMany({
        where: {
          customerId,
          status: BookingStatus.CONFIRMED,
          checkInDate: { gte: startOfToday },
        },
        orderBy: { checkInDate: 'asc' },
        take: 1,
        select: {
          id: true,
          bookingReference: true,
          checkInDate: true,
          checkOutDate: true,
          status: true,
          bookingRooms: {
            select: {
              assignedRoom: { select: { roomNumber: true } },
            },
          },
        },
      }),
    ]);

    return {
      stats,
      recentBookings: recentBookings.map((booking) =>
        this.toCustomerDashboardBooking(booking),
      ),
      upcomingBookings: upcomingBookings.map((booking) =>
        this.toCustomerDashboardBooking(booking),
      ),
    };
  }

  private async getCustomerStats(
    customerId: string,
    startOfToday: Date,
  ): Promise<KpiStat[]> {
    const [
      upcomingStays,
      activeStays,
      totalBookings,
      pendingInvoices,
      payments,
    ] = await Promise.all([
      this.prismaService.booking.count({
        where: {
          customerId,
          status: 'CONFIRMED',
          checkInDate: { gte: startOfToday },
        },
      }),
      this.prismaService.booking.count({
        where: { customerId, status: 'CHECKED_IN' },
      }),
      this.prismaService.booking.count({ where: { customerId } }),
      this.prismaService.invoice.aggregate({
        where: {
          customerId,
          status: { in: ['UNPAID', 'PARTIALLY_PAID'] },
        },
        _sum: { totalAmount: true },
      }),
      this.prismaService.payment.aggregate({
        where: {
          customerId,
          paymentStatus: 'COMPLETED',
          invoice: {
            status: { in: ['UNPAID', 'PARTIALLY_PAID'] },
          },
        },
        _sum: { amount: true },
      }),
    ]);

    const pendingPayment =
      (pendingInvoices._sum?.totalAmount ?? 0) - (payments._sum.amount ?? 0);
    const formattedPendingPayment = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(pendingPayment);

    return [
      {
        id: 'upcoming-stays',
        icon: 'CalendarCheck',
        title: 'Upcoming Stay',
        value: upcomingStays,
        description: 'Confirmed stays starting today or later',
      },
      {
        id: 'active-stays',
        icon: 'BedDouble',
        title: 'Active Stay',
        value: activeStays,
        description: 'Currently checked-in stays',
      },
      {
        id: 'total-bookings',
        icon: 'CalendarDays',
        title: 'Total Bookings',
        value: totalBookings,
        description: 'All your bookings',
      },
      {
        id: 'pending-payment',
        icon: 'Wallet',
        title: 'Pending Payment',
        value: formattedPendingPayment,
        description: 'Outstanding invoice balance',
      },
    ];
  }

  private toCustomerDashboardBooking(booking: {
    id: string;
    bookingReference: string;
    checkInDate: Date;
    checkOutDate: Date;
    status: BookingStatus;
    bookingRooms: { assignedRoom: { roomNumber: string } | null }[];
  }): CustomerDashboardBooking {
    return {
      id: booking.id,
      booking: booking.bookingReference,
      room:
        booking.bookingRooms
          .map(({ assignedRoom }) => assignedRoom?.roomNumber)
          .filter(Boolean)
          .join(', ') || 'Unassigned',
      checkIn: booking.checkInDate.toISOString().slice(0, 10),
      checkOut: booking.checkOutDate.toISOString().slice(0, 10),
      status: booking.status,
    };
  }

  private getTodayRange(): { startOfDay: Date; startOfNextDay: Date } {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const startOfNextDay = new Date(startOfDay);
    startOfNextDay.setDate(startOfNextDay.getDate() + 1);

    return { startOfDay, startOfNextDay };
  }
}
