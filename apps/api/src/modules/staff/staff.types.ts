import { Category, UserRole, UserStatus } from '../../types';

export type CreateStaffResponse = {
  category: Category;
  email: string;
  fullName: string;
  id: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
};

export type StaffListItem = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  category: string;
  createdAt: Date | null;
};

export type StaffDetailsResponse = {
  createdAt: Date;
  email: string;
  fullName: string;
  id: string;
  lastLoginAt: Date | null;
  phone: string;
  profileImage: string;
  role: UserRole;
  staff: {
    address: string;
    category: Category;
    createdAt: Date;
    emergencyContact: string;
    experience: string;
    fatherName: string;
    id: string;
    idProofImage: string;
    idProofNumber: string;
    motherName: string;
    qualification: string;
    signature: string;
    status: string;
    updatedAt: Date;
  } | null;
  status: UserStatus;
  updatedAt: Date;
};
