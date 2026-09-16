import type { NavItem } from "@/components/shadcn-space/blocks/sidebar-01/nav-main";
import {
  BedDouble,
  Bell,
  CalendarCheck,
  CircleDollarSign,
  LayoutDashboard,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";

export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  STAFF: "STAFF",
  CUSTOMER: "CUSTOMER",
};

export const STAFF_CATEGORIES = {
  RECEPTIONIST: "RECEPTIONIST",
  HOUSEKEEPER: "HOUSEKEEPER",
};

export const ADMIN_PAGES: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "dashboard" },
  { title: "Staff", icon: Users, href: "staff" },
  { title: "Customers", icon: UserCheck, href: "customers" },
  { title: "Rooms", icon: BedDouble, href: "rooms" },
  { title: "Bookings", icon: CalendarCheck, href: "bookings" },
  {
    title: "Maintenance",
    icon: Wrench,
    href: "maintenance",
  },
  { title: "Finance", icon: CircleDollarSign, href: "finance" },
  { title: "Notifications", icon: Bell, href: "notifications" },
];
