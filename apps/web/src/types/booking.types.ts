export interface Booking {
  id: string;
  guest: {
    id: string;
    name: string;
    initials: string;
  };
  room: {
    number: string;
    type: "Standard" | "Deluxe" | "Suite";
  };
  dates: {
    checkIn: string;
    checkOut: string;
  };
  status: "confirmed" | "checked-in" | "pending" | "cancelled";

  amount: {
    value: number;
    currency: "INR";
  };
}
