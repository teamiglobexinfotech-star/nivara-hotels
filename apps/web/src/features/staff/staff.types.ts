import type { StaffCategory, UserRole } from "@/types/shared.types";

export type Staff = {
  id: string;
  staffCode?: string;
  fullName: string;
  email: string;
  phone: string;
  category: StaffCategory;
  isActive: boolean;
  createdAt: Date;
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
    category: StaffCategory;
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
