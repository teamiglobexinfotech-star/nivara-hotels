import {
  CalendarRange,
  CircleDollarSign,
  ReceiptText,
  Users,
} from "lucide-react";
import type { Booking } from "@/types/booking.types";
import type { ApiResponse, KpiItem } from "@/types/shared.types";

export const bookingKpiData: KpiItem[] = [
  {
    id: 1,
    icon: ReceiptText,
    title: "Total Bookings",
    value: 12,
    detail: "Reservations this cycle",
  },
  {
    id: 2,
    icon: Users,
    title: "Confirmed",
    value: 4,
    detail: "Guests secured",
  },
  {
    id: 3,
    icon: CalendarRange,
    title: "Checked In",
    value: 2,
    detail: "Currently on property",
  },
  {
    id: 4,
    icon: CircleDollarSign,
    title: "Revenue",
    value: "₹1.42L",
    detail: "Gross booking value",
  },
];

export const bookingsApiResponse: ApiResponse<Booking> = {
  items: [
    {
      customer: {
        fullName: "Aarav Sharma",
        phone: "+91 98765 43210",
      },
      bookingReference: "BK-2026-001847",
      status: "CONFIRMED",
      totalGuests: 2,
      totalAmount: 8400,
    },
    {
      customer: {
        fullName: "Priya Verma",
        phone: "+91 98123 76540",
      },
      bookingReference: "BK-2026-001848",
      status: "CHECKED_IN",
      totalGuests: 2,
      totalAmount: 12600,
    },
    {
      customer: {
        fullName: "Rohan Mehta",
        phone: "+91 97654 32108",
      },
      bookingReference: "BK-2026-001849",
      status: "PENDING",
      totalGuests: 1,
      totalAmount: 5200,
    },
    {
      customer: {
        fullName: "Ananya Kapoor",
        phone: "+91 98987 65432",
      },
      bookingReference: "BK-2026-001850",
      status: "CHECKED_OUT",
      totalGuests: 3,
      totalAmount: 18900,
    },
    {
      customer: {
        fullName: "Vikram Singh",
        phone: "+91 99887 76655",
      },
      bookingReference: "BK-2026-001851",
      status: "CANCELLED",
      totalGuests: 4,
      totalAmount: 32400,
    },
    {
      customer: {
        fullName: "Neha Gupta",
        phone: "+91 98712 34567",
      },
      bookingReference: "BK-2026-001852",
      status: "NO_SHOW",
      totalGuests: 2,
      totalAmount: 11200,
    },
    {
      customer: {
        fullName: "Aditya Malhotra",
        phone: "+91 98201 45678",
      },
      bookingReference: "BK-2026-001853",
      status: "CONFIRMED",
      totalGuests: 2,
      totalAmount: 28600,
    },
    {
      customer: {
        fullName: "Sneha Iyer",
        phone: "+91 99001 23456",
      },
      bookingReference: "BK-2026-001854",
      status: "CHECKED_IN",
      totalGuests: 4,
      totalAmount: 35200,
    },
    {
      customer: {
        fullName: "Karan Joshi",
        phone: "+91 97979 12345",
      },
      bookingReference: "BK-2026-001855",
      status: "PENDING",
      totalGuests: 2,
      totalAmount: 14800,
    },
    {
      customer: {
        fullName: "Meera Nair",
        phone: "+91 98470 56789",
      },
      bookingReference: "BK-2026-001856",
      status: "CHECKED_OUT",
      totalGuests: 2,
      totalAmount: 13200,
    },
    {
      customer: {
        fullName: "Rahul Khanna",
        phone: "+91 98100 11223",
      },
      bookingReference: "BK-2026-001857",
      status: "CONFIRMED",
      totalGuests: 1,
      totalAmount: 6500,
    },
    {
      customer: {
        fullName: "Ishita Rao",
        phone: "+91 98765 99887",
      },
      bookingReference: "BK-2026-001858",
      status: "CANCELLED",
      totalGuests: 3,
      totalAmount: 29700,
    },
  ],
  meta: {
    page: 1,
    limit: 12,
    total: 12,
    totalPages: 1,
  },
};
