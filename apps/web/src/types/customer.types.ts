import type { Status } from "@/types";

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  status: Status;
}
