import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../db/prisma/prisma.service';

import { GetMyBookingsDto } from './dtos/get-my-bookings.dto';
import { MyBooking } from './booking.types';

@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMyBookings(
    customerId: string,
    query: GetMyBookingsDto,
  ): Promise<MyBooking[]> {
    const { search, status } = query;
    const bookings = await this.prismaService.booking.findMany({
      where: {
        customerId,
        ...(status && { status }),
        ...(search && {
          OR: [
            {
              bookingReference: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              bookingRooms: {
                some: {
                  assignedRoom: {
                    roomNumber: {
                      contains: search,
                      mode: 'insensitive' as const,
                    },
                  },
                },
              },
            },
          ],
        }),
      },
      orderBy: { bookedAt: 'desc' },
      select: {
        id: true,
        bookingReference: true,
        checkInDate: true,
        checkOutDate: true,
        totalAmount: true,
        status: true,
        bookingRooms: {
          select: {
            assignedRoom: { select: { roomNumber: true } },
          },
        },
      },
    });

    return bookings.map((booking) => ({
      id: booking.id,
      booking: booking.bookingReference,
      room:
        booking.bookingRooms
          .map(({ assignedRoom }) => assignedRoom?.roomNumber)
          .filter(Boolean)
          .join(', ') || 'Unassigned',
      checkIn: booking.checkInDate.toISOString().slice(0, 10),
      checkOut: booking.checkOutDate.toISOString().slice(0, 10),
      amount: booking.totalAmount,
      status: booking.status,
    }));
  }
}
