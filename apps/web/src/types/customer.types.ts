import type { UserRole, UserStatus } from "./shared.types";

export interface Customer {
  id: string;
  fullName: string;
  profileImage: string;
  email: string;
  phone: string;
  status: UserStatus;
  createdAt?: Date;
  customerProfile: {
    id: string;
    idProofNumber: string;
    address: string;
  } | null;
}

export type CustomerDetails = {
  id: string;
  fullName: string;
  profileImage: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt?: Date;
  customerProfile: {
    id: string;
    idProofImage: string;
    idProofNumber: string;
    address: string;
    signature: string;
  } | null;
};
