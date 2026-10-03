import { Category, UserRole } from '../../types';

export type StaffCategory = Category;

export type StaffItem = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  category: StaffCategory;
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
};

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

export type StaffDetail = StaffItem & {
  address: string;
  fatherName: string;
  motherName: string;
  idProofNumber: string;
  qualification: string;
  experience: string;
  emergencyContact: string;
};

export type Housekeeper = {
  id: string;
  name: string;
  totalTasks: number;
};
