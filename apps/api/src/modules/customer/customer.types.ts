import { UserRole, UserStatus } from '../../types';

export type CreateCustomerResponse = {
  customerProfile: {
    address: string;
    id: string;
    idProofNumber: string;
  } | null;
  email: string;
  fullName: string;
  id: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
};

export type CustomerListItem = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: UserStatus;
  customerProfile: {
    id: string;
    idProofNumber: string;
    address: string;
  } | null;
};

export type CustomerDetailsResponse = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  customerProfile: {
    id: string;
    idProofImage: string;
    idProofNumber: string;
    address: string;
    signature: string;
  } | null;
};
