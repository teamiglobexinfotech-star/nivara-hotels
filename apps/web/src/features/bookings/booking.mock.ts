import type { KpiItem } from "@/types/shared.types";

import type { BookingList, CustomerList } from "./booking.types";

export const dummyBookingKpiData: KpiItem[] = [
  {
    id: 1,
    iconKey: "calendarcheck",
    title: "Total Bookings",
    value: 1248,
    details: "+12.5% from last month",
  },
  {
    id: 2,
    iconKey: "clock",
    title: "Pending Bookings",
    value: 86,
    details: "7.2% of total bookings",
  },
  {
    id: 3,
    iconKey: "checkcircle",
    title: "Confirmed Bookings",
    value: 1104,
    details: "88.5% confirmation rate",
  },
  {
    id: 4,
    iconKey: "xcircle",
    title: "Cancelled Bookings",
    value: 58,
    details: "4.6% cancellation rate",
  },
];

export const dummyBookingList: BookingList = [
  {
    id: "booking-001",
    bookingReference: "BK-2026-0001",
    customer: {
      id: "customer-001",
      fullName: "John Doe",
    },
    room: {
      id: "room-101",
      roomNumber: "101",
      name: "Deluxe King Room",
    },
    checkInDate: "2026-09-25",
    checkOutDate: "2026-09-28",
    totalAmount: 45000,
    status: "CONFIRMED",
  },
  {
    id: "booking-002",
    bookingReference: "BK-2026-0002",
    customer: {
      id: "customer-002",
      fullName: "Sarah Wilson",
    },
    room: {
      id: "room-205",
      roomNumber: "205",
      name: "Executive Suite",
    },
    checkInDate: "2026-09-26",
    checkOutDate: "2026-09-30",
    totalAmount: 72000,
    status: "PENDING",
  },
  {
    id: "booking-003",
    bookingReference: "BK-2026-0003",
    customer: {
      id: "customer-003",
      fullName: "Michael Brown",
    },
    room: {
      id: "room-302",
      roomNumber: "302",
      name: "Premium Twin Room",
    },
    checkInDate: "2026-09-24",
    checkOutDate: "2026-09-27",
    totalAmount: 36000,
    status: "CHECKED_IN",
  },
  {
    id: "booking-004",
    bookingReference: "BK-2026-0004",
    customer: {
      id: "customer-004",
      fullName: "Emily Johnson",
    },
    room: {
      id: "room-401",
      roomNumber: "401",
      name: "Presidential Suite",
    },
    checkInDate: "2026-09-20",
    checkOutDate: "2026-09-25",
    totalAmount: 125000,
    status: "CHECKED_OUT",
  },
  {
    id: "booking-005",
    bookingReference: "BK-2026-0005",
    customer: {
      id: "customer-005",
      fullName: "David Miller",
    },
    room: {
      id: "room-108",
      roomNumber: "108",
      name: "Standard Queen Room",
    },
    checkInDate: "2026-09-27",
    checkOutDate: "2026-09-29",
    totalAmount: 24000,
    status: "CONFIRMED",
  },
  {
    id: "booking-006",
    bookingReference: "BK-2026-0006",
    customer: {
      id: "customer-006",
      fullName: "Olivia Davis",
    },
    room: {
      id: "room-212",
      roomNumber: "212",
      name: "Deluxe Twin Room",
    },
    checkInDate: "2026-09-22",
    checkOutDate: "2026-09-24",
    totalAmount: 28000,
    status: "CANCELLED",
  },
  {
    id: "booking-007",
    bookingReference: "BK-2026-0007",
    customer: {
      id: "customer-007",
      fullName: "James Anderson",
    },
    room: {
      id: "room-305",
      roomNumber: "305",
      name: "Executive King Room",
    },
    checkInDate: "2026-09-28",
    checkOutDate: "2026-10-02",
    totalAmount: 64000,
    status: "PENDING",
  },
  {
    id: "booking-008",
    bookingReference: "BK-2026-0008",
    customer: {
      id: "customer-008",
      fullName: "Sophia Martinez",
    },
    room: {
      id: "room-403",
      roomNumber: "403",
      name: "Luxury Suite",
    },
    checkInDate: "2026-09-18",
    checkOutDate: "2026-09-22",
    totalAmount: 98000,
    status: "NO_SHOW",
  },
  {
    id: "booking-009",
    bookingReference: "BK-2026-0009",
    customer: {
      id: "customer-009",
      fullName: "Daniel Taylor",
    },
    room: {
      id: "room-116",
      roomNumber: "116",
      name: "Standard King Room",
    },
    checkInDate: "2026-09-23",
    checkOutDate: "2026-09-26",
    totalAmount: 33000,
    status: "CHECKED_IN",
  },
  {
    id: "booking-010",
    bookingReference: "BK-2026-0010",
    customer: {
      id: "customer-010",
      fullName: "Emma Thomas",
    },
    room: {
      id: "room-208",
      roomNumber: "208",
      name: "Deluxe Suite",
    },
    checkInDate: "2026-09-29",
    checkOutDate: "2026-10-03",
    totalAmount: 84000,
    status: "CONFIRMED",
  },
];

export const dummyCustomerList: CustomerList = [
  {
    id: "customer-001",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
  },
  {
    id: "customer-002",
    fullName: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+91 98765 43211",
  },
  {
    id: "customer-003",
    fullName: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+91 98765 43212",
  },
  {
    id: "customer-004",
    fullName: "Emily Johnson",
    email: "emily.johnson@example.com",
    phone: "+91 98765 43213",
  },
  {
    id: "customer-005",
    fullName: "David Miller",
    email: "david.miller@example.com",
    phone: "+91 98765 43214",
  },
  {
    id: "customer-006",
    fullName: "Olivia Davis",
    email: "olivia.davis@example.com",
    phone: "+91 98765 43215",
  },
  {
    id: "customer-007",
    fullName: "James Anderson",
    email: "james.anderson@example.com",
    phone: "+91 98765 43216",
  },
  {
    id: "customer-008",
    fullName: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    phone: "+91 98765 43217",
  },
  {
    id: "customer-009",
    fullName: "Daniel Taylor",
    email: "daniel.taylor@example.com",
    phone: "+91 98765 43218",
  },
  {
    id: "customer-010",
    fullName: "Emma Thomas",
    email: "emma.thomas@example.com",
    phone: "+91 98765 43219",
  },
];
