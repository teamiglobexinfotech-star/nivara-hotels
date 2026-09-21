import { RefreshCw, UserCheck, UserPlus, Users } from "lucide-react";

import type { KpiItem } from "@/types/shared.types";

import type { Customer } from "./customer.types";

export const customersData: Customer[] = [
  {
    id: "cus_001",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98765 43210",
    idProofNumber: "XXXX-XXXX-4521",
    address: "Hazratganj, Lucknow, Uttar Pradesh",
    role: "CUSTOMER",
    isActive: true,
    lastLoginAt: new Date("2026-09-22T18:30:00"),
    createdAt: new Date("2025-11-12"),
  },
  {
    id: "cus_002",
    fullName: "Priya Mehta",
    email: "priya.mehta@gmail.com",
    phone: "+91 98123 45678",
    idProofNumber: "XXXX-XXXX-7834",
    address: "Gomti Nagar, Lucknow, Uttar Pradesh",
    role: "CUSTOMER",
    isActive: true,
    lastLoginAt: new Date("2026-09-23T09:15:00"),
    createdAt: new Date("2026-01-08"),
  },
  {
    id: "cus_003",
    fullName: "Rohan Verma",
    email: "rohan.verma@gmail.com",
    phone: "+91 97654 32109",
    idProofNumber: "XXXX-XXXX-2167",
    address: "Indira Nagar, Lucknow, Uttar Pradesh",
    role: "CUSTOMER",
    isActive: true,
    lastLoginAt: new Date("2026-09-20T14:45:00"),
    createdAt: new Date("2025-08-19"),
  },
  {
    id: "cus_004",
    fullName: "Ananya Kapoor",
    email: "ananya.kapoor@gmail.com",
    phone: "+91 98987 65432",
    idProofNumber: "XXXX-XXXX-9056",
    address: "Aliganj, Lucknow, Uttar Pradesh",
    role: "CUSTOMER",
    isActive: false,
    lastLoginAt: new Date("2026-07-14T11:20:00"),
    createdAt: new Date("2024-12-03"),
  },
  {
    id: "cus_005",
    fullName: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    phone: "+91 97012 34567",
    idProofNumber: "XXXX-XXXX-6348",
    address: "Mahanagar, Lucknow, Uttar Pradesh",
    role: "CUSTOMER",
    isActive: true,
    lastLoginAt: null,
    createdAt: new Date("2026-06-27"),
  },
];

export const customerKpiData: KpiItem[] = [
  {
    id: 1,
    iconKey: Users,
    title: "Total Customers",
    value: "2,486",
    details: "+12.5% this month",
  },
  {
    id: 2,
    iconKey: UserCheck,
    title: "Active Customers",
    value: "1,842",
    details: "74% of total customers",
  },
  {
    id: 3,
    iconKey: UserPlus,
    title: "New This Month",
    value: "186",
    details: "+18 from last month",
  },
  {
    id: 4,
    iconKey: RefreshCw,
    title: "Returning Guests",
    value: "68%",
    details: "+6.2% booking retention",
  },
];
