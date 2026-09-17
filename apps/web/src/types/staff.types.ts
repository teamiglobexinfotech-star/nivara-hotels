import type { StaffCategory, Status } from "@/types";

export interface StaffMember {
  id: string;
  name: string;
  staffId: string;
  avatar: string;
  phone: string;
  role: StaffCategory;
  status: Status;
}
