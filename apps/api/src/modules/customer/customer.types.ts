export type CustomerBase = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};

export type Image = {
  id: string;
  url: string;
  altText: string | null;
};

export type CustomerCreate = CustomerBase & {
  isActive: boolean;
};

export type CustomerList = CustomerBase & {
  isActive: boolean;
  totalBookings: number | null;
  totalSpend: number;
};

export type CustomerDetails = CustomerBase & {
  isActive: boolean;
  address: string;
  idProofNumber: string;
  idProofImage: Image | null;
  signatureImage: Image | null;
};

export type SearchCustomer = Omit<CustomerBase, 'phone'>;
