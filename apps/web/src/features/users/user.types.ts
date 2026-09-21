import type { StaffCategory, UserRole } from "@/types/shared.types";

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  category?: StaffCategory;
  profileImage: {
    id: string;
    fileId: string;
    altText: string | null;
  } | null;
};
