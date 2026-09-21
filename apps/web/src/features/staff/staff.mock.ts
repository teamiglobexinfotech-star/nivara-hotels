import { Calendar, Search, UserCheck, Users } from "lucide-react";

import type { KpiItem } from "@/types/shared.types";

import type { Staff } from "./staff.types";

export const staffData: Staff[] = [
  {
    id: "staff_001",
    staffCode: "STF-001",
    fullName: "Rahul Sharma",
    email: "rahul.sharma@grandstay.com",
    phone: "+91 98765 43210",
    category: "RECEPTIONIST",
    isActive: true,
    joinedAt: new Date("2023-06-15"),
  },
  {
    id: "staff_002",
    staffCode: "STF-002",
    fullName: "Priya Verma",
    email: "priya.verma@grandstay.com",
    phone: "+91 98123 45678",
    category: "HOUSEKEEPER",
    isActive: true,
    joinedAt: new Date("2024-01-22"),
  },
  {
    id: "staff_003",
    staffCode: "STF-003",
    fullName: "Amit Kumar",
    email: "amit.kumar@grandstay.com",
    phone: "+91 97654 32109",
    category: "RECEPTIONIST",
    isActive: true,
    joinedAt: new Date("2022-11-08"),
  },
  {
    id: "staff_004",
    staffCode: "STF-004",
    fullName: "Neha Singh",
    email: "neha.singh@grandstay.com",
    phone: "+91 98987 65432",
    category: "HOUSEKEEPER",
    isActive: false,
    joinedAt: new Date("2023-09-12"),
  },
  {
    id: "staff_005",
    staffCode: "STF-005",
    fullName: "Vikash Yadav",
    email: "vikash.yadav@grandstay.com",
    phone: "+91 97012 34567",
    category: "HOUSEKEEPER",
    isActive: true,
    joinedAt: new Date("2025-02-03"),
  },
];

export const staffKpiData: KpiItem[] = [
  {
    id: 1,
    iconKey: Users,
    title: "Total Staff",
    value: 48,
    details: "All registered staff",
  },
  {
    id: 2,
    iconKey: UserCheck,
    title: "ACTIVE Staff",
    value: 43,
    details: "Currently active accounts",
  },
  {
    id: 3,
    iconKey: Calendar,
    title: "On Leave",
    value: 3,
    details: "Currently unavailable",
  },
  {
    id: 4,
    iconKey: Search,
    title: "Open Positions",
    value: 2,
    details: "Roles requiring hiring",
  },
];
