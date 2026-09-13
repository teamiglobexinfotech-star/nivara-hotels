import type { Booking } from "@/types/booking.types";

export const bookings: Booking[] = [
  {
    id: "1048",
    guest: {
      id: "guest_001",
      name: "Rahul Sharma",
      initials: "RS",
    },
    room: {
      number: "204",
      type: "Deluxe",
    },
    dates: {
      checkIn: "Sep 9",
      checkOut: "Sep 11",
    },
    status: "confirmed",
    amount: {
      value: 14200,
      currency: "INR",
    },
  },

  {
    id: "1047",
    guest: {
      id: "guest_002",
      name: "Anika Patel",
      initials: "AP",
    },
    room: {
      number: "302",
      type: "Suite",
    },
    dates: {
      checkIn: "Sep 9",
      checkOut: "Sep 12",
    },
    status: "checked-in",
    amount: {
      value: 28500,
      currency: "INR",
    },
  },

  {
    id: "1046",
    guest: {
      id: "guest_003",
      name: "David Kumar",
      initials: "DK",
    },
    room: {
      number: "101",
      type: "Standard",
    },
    dates: {
      checkIn: "Sep 10",
      checkOut: "Sep 13",
    },
    status: "pending",
    amount: {
      value: 9800,
      currency: "INR",
    },
  },

  {
    id: "1045",
    guest: {
      id: "guest_004",
      name: "Priya Singh",
      initials: "PS",
    },
    room: {
      number: "405",
      type: "Suite",
    },
    dates: {
      checkIn: "Sep 10",
      checkOut: "Sep 14",
    },
    status: "confirmed",
    amount: {
      value: 36000,
      currency: "INR",
    },
  },

  {
    id: "1044",
    guest: {
      id: "guest_005",
      name: "James Wilson",
      initials: "JW",
    },
    room: {
      number: "208",
      type: "Deluxe",
    },
    dates: {
      checkIn: "Sep 11",
      checkOut: "Sep 12",
    },
    status: "confirmed",
    amount: {
      value: 7400,
      currency: "INR",
    },
  },
];
