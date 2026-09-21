import type { StaffCategory } from "@/types";

import type { UserRole } from "./shared.types";

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  category?: StaffCategory;
};
