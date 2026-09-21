import type { StaffCategory } from "@/types/shared.types";

export type Staff = {
  id: string;
  staffCode: string;
  fullName: string;
  email: string;
  phone: string;
  category: StaffCategory;
  isActive: boolean;
  joinedAt: Date;
};
