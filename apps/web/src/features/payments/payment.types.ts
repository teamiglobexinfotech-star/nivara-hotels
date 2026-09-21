export type Payment = {
  id: string;
  paymentCode: string;
  guestName: string;
  amount: number;
  status: string;
  paymentMethod: string;
  paidAt: Date;
};
