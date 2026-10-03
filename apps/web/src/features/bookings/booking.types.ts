import type { SearchCustomer } from "../customers/customer.types";
import type { PaymentInfo } from "../payments/payment.types";
import type { AvailabilityQuery, RoomAvailableItem } from "../rooms/room.types";

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

export type Guest = {
  primaryGuest: {
    fullName: string;
    age: number;
    gender: "male" | "female" | "other";
  };
  totalGuests: number;
  specialRequest?: string;
};

export interface BookingReducerState {
  customer?: SearchCustomer;
  stayAndRoom?: { room: RoomAvailableItem; query: AvailabilityQuery };
  guest?: Guest;
  payment?: PaymentInfo;
}
