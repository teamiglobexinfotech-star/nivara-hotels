import type { Status } from "@/types";

export interface Customer {
  id: string;
  name: string;
  customerId: string;
  avatar: string;
  phone: string;
  email: string;
  status: Status;
}
