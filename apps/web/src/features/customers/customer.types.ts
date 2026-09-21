export type Customer = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  idProofNumber: string;
  address: string;
  role: "CUSTOMER";
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
};
