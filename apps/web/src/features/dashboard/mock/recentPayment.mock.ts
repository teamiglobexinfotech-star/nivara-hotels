import type { Payment } from "@/features/payments/payment.types";

export const recentPayments: Payment[] = [
  {
    id: "pay_001",
    paymentCode: "PAY-2026-00421",
    guestName: "Aarav Sharma",
    amount: 12450,
    status: "SUCCESS",
    paymentMethod: "Credit Card",
    paidAt: new Date("2026-09-20T14:35:00"),
  },
  {
    id: "pay_002",
    paymentCode: "PAY-2026-00422",
    guestName: "Priya Mehta",
    amount: 28600,
    status: "SUCCESS",
    paymentMethod: "UPI",
    paidAt: new Date("2026-09-21T10:15:00"),
  },
  {
    id: "pay_003",
    paymentCode: "PAY-2026-00423",
    guestName: "Rohan Verma",
    amount: 9800,
    status: "PENDING",
    paymentMethod: "Net Banking",
    paidAt: new Date("2026-09-22T16:45:00"),
  },
  {
    id: "pay_004",
    paymentCode: "PAY-2026-00424",
    guestName: "Ananya Kapoor",
    amount: 19200,
    status: "SUCCESS",
    paymentMethod: "Debit Card",
    paidAt: new Date("2026-09-23T09:30:00"),
  },
  {
    id: "pay_005",
    paymentCode: "PAY-2026-00425",
    guestName: "Vikram Singh",
    amount: 13500,
    status: "FAILED",
    paymentMethod: "UPI",
    paidAt: new Date("2026-09-23T11:20:00"),
  },
];
