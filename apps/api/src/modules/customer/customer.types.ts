import { UserRole } from '../../types';

export type Customer = {
  email: string;
  fullName: string;
  id: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  customerProfile: {
    address: string;
    id: string;
    idProofNumber: string;
  } | null;
};

export type CustomerList = {
  id: string;
  fullName: string;
  profileImageId: string | null;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  customerProfile: {
    id: string;
    idProofNumber: string;
    address: string;
  } | null;
};

export type CustomerDetails = {
  id: string;
  fullName: string;
  profileImageId: string | null;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  customerProfile: {
    id: string;
    idProofNumber: string;
    idProofImageId: string | null;
    signatureImageId: string | null;
    address: string;
  } | null;
};
