import { Category } from '../../types';

export type StaffBase = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  category: Category | null;
  isActive: boolean;
};

export type Image = {
  id: string;
  url: string;
  altText: string | null;
};

export type StaffCreate = StaffBase;

export type StaffList = StaffBase & {
  createdAt: string | null;
  lastLogin: string | null;
};

export type StaffDetails = StaffBase & {
  createdAt: string | null;
  lastLogin: string | null;
  address: string;
  fatherName: string;
  motherName: string;
  idProofNumber: string;
  category: Category;
  qualification: string;
  experience: string;
  emergencyContact: string;
  idProofImage: Image | null;
  signatureImage: Image | null;
};

export type Housekeeper = {
  id: string;
  name: string;
  totalTasks: number;
};
