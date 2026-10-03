export type CustomerItem = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpend: number;
  isActive: boolean;
};

export type CustomerDetail = CustomerItem & {
  address: string;
  idProofNumber: string;
};

export type SearchCustomer = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};
