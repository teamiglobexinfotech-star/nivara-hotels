import { Category, UserRole } from '../../types';

export type Staff = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  category?: Category;
  createdAt: Date | null;
  updatedAt: Date | null;
};

export type StaffList = Staff;

export type StaffDetails = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  staff: {
    id: string;
    fatherName: string;
    motherName: string;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: Category;
    emergencyContact: string;
    address: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    idProofImage: {
      id: string;
      fileId: string;
      altText: string | null;
    } | null;
    signatureImage: {
      id: string;
      fileId: string;
      altText: string | null;
    } | null;
  } | null;
};

export type Housekeeper = {
  id: string;
  name: string;
  totalTasks: number;
};
