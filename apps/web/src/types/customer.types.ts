import type { UserRole, UserStatus } from "./shared.types";

export interface Customer {
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
}

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
