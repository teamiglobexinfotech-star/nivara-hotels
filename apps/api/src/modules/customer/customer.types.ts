export type Customer = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  lastLoginAt: Date | null;
  customerProfile: {
    id: string;
    idProofNumber: string;
    address: string;
  } | null;
};

export type CustomerList = Customer;

export type CustomerDetails = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  lastLoginAt: Date | null;
  customerProfile: {
    id: string;
    idProofNumber: string;
    address: string;
  } | null;
};
