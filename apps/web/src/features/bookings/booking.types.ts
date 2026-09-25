export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CHECKED_IN"
  | "CHECKED_OUT"
  | "CANCELLED"
  | "NO_SHOW";

export interface BookingItem {
  id: string | number;
  bookingReference: string;
  customer: {
    id: string | number;
    fullName: string;
  };
  room: {
    id: string | number;
    roomNumber: string;
    name: string;
  };
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status: BookingStatus;
}

export type BookingList = BookingItem[];

export interface CustomerItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export type CustomerList = CustomerItem[];
