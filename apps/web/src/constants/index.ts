import {
  BedDouble,
  Bell,
  BriefcaseBusiness,
  CalendarCheck,
  CircleDollarSign,
  Home,
  LayoutDashboard,
  Sparkles,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";

import type { NavItem } from "@/components/shadcn-space/blocks/sidebar-01/nav-main";
import type { UserRole } from "@/types/shared.types";

export const ROLES: { [key: string]: UserRole } = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  STAFF: "STAFF",
  CUSTOMER: "CUSTOMER",
} as const;

export const STAFF_CATEGORIES = {
  RECEPTIONIST: "RECEPTIONIST",
  HOUSEKEEPER: "HOUSEKEEPER",
} as const;

export const STAFF_CATEGORY_OPTIONS = [
  {
    id: STAFF_CATEGORIES.RECEPTIONIST,
    name: STAFF_CATEGORIES.RECEPTIONIST,
  },
  {
    id: STAFF_CATEGORIES.HOUSEKEEPER,
    name: STAFF_CATEGORIES.HOUSEKEEPER,
  },
];

export const ADMIN_PAGES: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Staff", icon: Users, href: "/dashboard/staff" },
  { title: "Customers", icon: UserCheck, href: "/dashboard/customers" },
  { title: "Rooms", icon: BedDouble, href: "/dashboard/rooms" },
  { title: "Bookings", icon: CalendarCheck, href: "/dashboard/bookings" },
  { title: "Maintenance", icon: Wrench, href: "/dashboard/maintenance" },
  { title: "Finance", icon: CircleDollarSign, href: "/dashboard/finance" },
  { title: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  { title: "Profile", icon: BriefcaseBusiness, href: "/dashboard/profile" },
];

export const MANAGER_PAGES: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Staff", icon: Users, href: "/dashboard/staff" },
  { title: "Customers", icon: UserCheck, href: "/dashboard/customers" },
  { title: "Rooms", icon: BedDouble, href: "/dashboard/rooms" },
  { title: "Bookings", icon: CalendarCheck, href: "/dashboard/bookings" },
  { title: "Maintenance", icon: Wrench, href: "/dashboard/maintenance" },
  { title: "Finance", icon: CircleDollarSign, href: "/dashboard/finance" },
  { title: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  { title: "Profile", icon: BriefcaseBusiness, href: "/dashboard/profile" },
];

export const RECEPTIONIST_PAGES: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Customers", icon: UserCheck, href: "/dashboard/customers" },
  { title: "Bookings", icon: CalendarCheck, href: "/dashboard/bookings" },
  { title: "Finance", icon: CircleDollarSign, href: "/dashboard/finance" },
  { title: "Maintenance", icon: Wrench, href: "/dashboard/maintenance" },
  { title: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  { title: "Profile", icon: BriefcaseBusiness, href: "/dashboard/profile" },
];

export const HOUSEKEEPER_PAGES: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "My Tasks", icon: Sparkles, href: "/dashboard/tasks" },
  { title: "Rooms", icon: Home, href: "/dashboard/rooms" },
  { title: "Maintenance", icon: Wrench, href: "/dashboard/maintenance" },
  { title: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  { title: "Profile", icon: BriefcaseBusiness, href: "/dashboard/profile" },
];

export const CUSTOMER_PAGES: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Browse Rooms", icon: BedDouble, href: "/dashboard/rooms" },
  { title: "My Bookings", icon: CalendarCheck, href: "/dashboard/bookings" },
  { title: "Finance", icon: CircleDollarSign, href: "/dashboard/finance" },
  { title: "Maintenance", icon: Wrench, href: "/dashboard/maintenance" },
  { title: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  { title: "Profile", icon: BriefcaseBusiness, href: "/dashboard/profile" },
];

export const ROLE_NAVIGATION = {
  [ROLES.ADMIN]: ADMIN_PAGES,
  [ROLES.MANAGER]: MANAGER_PAGES,
  [ROLES.STAFF]: RECEPTIONIST_PAGES,
  [ROLES.CUSTOMER]: CUSTOMER_PAGES,
} as const;

export const OCCUPANCY_STATUS = [
  "VACANT",
  "RESERVED",
  "OCCUPIED",
  "OUT_OF_ORDER",
];

export const HOUSEKEEPING_STATUS = ["CLEAN", "DIRTY", "CLEANING"];

import {
  Car,
  type LucideIcon,
  Snowflake,
  Tv,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";

export const AMENITY_ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  air_conditioning: Snowflake,
  tv: Tv,
  parking: Car,
  pool: Waves,
  breakfast: Utensils,
};
