import { BookingStatus } from '../../types';

export type MyBooking = {
  id: string;
  booking: string;
  room: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  status: BookingStatus;
};
