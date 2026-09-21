export type Booking = {
  id: string;
  bookingCode: string;
  guestName: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  status: string;
  amount: number;
};
