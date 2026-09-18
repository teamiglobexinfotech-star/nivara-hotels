export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CHECKED_IN"
  | "CHECKED_OUT"
  | "CANCELLED"
  | "NO_SHOW";

export interface Booking {
  customer: {
    fullName: string;
    phone: string;
  };
  bookingReference: string;
  status: BookingStatus;
  totalGuests: number;
  totalAmount: number;
}
