export type Payment = {
  id: string;
  paymentCode: string;
  guestName: string;
  amount: number;
  status: string;
  paymentMethod: string;
  paidAt: Date;
};

export type PaymentMethod = "cash" | "card" | "upi" | "netbanking";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type PaymentInfo = {
  totalAmount: number;
  tax: number;
  discount: number;
  roomCharge: number;
  payment: {
    paymentMethod: "card" | "cash" | "netbanking" | "upi";
    paymentStatus: "failed" | "paid" | "pending" | "refunded";
    transactionId?: string | undefined;
  };
};
