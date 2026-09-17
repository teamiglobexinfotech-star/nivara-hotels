import type { NavItem } from "@/components/shadcn-space/blocks/sidebar-01/nav-main";
import {
  BedDouble,
  Bell,
  BriefcaseBusiness,
  CalendarCheck,
  CircleDollarSign,
  Home,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Wrench,
} from "lucide-react";

export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  STAFF: "STAFF",
  CUSTOMER: "CUSTOMER",
} as const;

export const STAFF_CATEGORIES = {
  RECEPTIONIST: "RECEPTIONIST",
  HOUSEKEEPER: "HOUSEKEEPER",
  SECURITY_GUARD: "SECURITY_GUARD",
  WAITER: "WAITER",
} as const;

export const ADMIN_PAGES: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Staff", icon: Users, href: "/staff" },
  { title: "Customers", icon: UserCheck, href: "/customers" },
  { title: "Rooms", icon: BedDouble, href: "/rooms" },
  { title: "Bookings", icon: CalendarCheck, href: "/bookings" },
  { title: "Maintenance", icon: Wrench, href: "/maintenance" },
  { title: "Finance", icon: CircleDollarSign, href: "/finance" },
  { title: "Notifications", icon: Bell, href: "/notifications" },
  { title: "Settings", icon: ShieldCheck, href: "/settings" },
  { title: "Profile", icon: BriefcaseBusiness, href: "/profile" },
];

export const MANAGER_PAGES: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/manager-dashboard" },
  { title: "Staff", icon: Users, href: "/manager/staff" },
  { title: "Customers", icon: UserCheck, href: "/manager/customers" },
  { title: "Rooms", icon: BedDouble, href: "/manager/rooms" },
  { title: "Bookings", icon: CalendarCheck, href: "/manager/bookings" },
  { title: "Maintenance", icon: Wrench, href: "/manager/maintenance" },
  { title: "Finance", icon: CircleDollarSign, href: "/manager/finance" },
  { title: "Notifications", icon: Bell, href: "/manager/notifications" },
  { title: "Profile", icon: BriefcaseBusiness, href: "/manager/profile" },
];

export const RECEPTIONIST_PAGES: NavItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/receptionist-dashboard",
  },
  { title: "Customers", icon: UserCheck, href: "/receptionist/customers" },
  { title: "Rooms", icon: BedDouble, href: "/receptionist/rooms" },
  { title: "Bookings", icon: CalendarCheck, href: "/receptionist/bookings" },
  { title: "Finance", icon: CircleDollarSign, href: "/receptionist/finance" },
  { title: "Maintenance", icon: Wrench, href: "/receptionist/maintenance" },
  { title: "Notifications", icon: Bell, href: "/receptionist/notifications" },
  { title: "Profile", icon: BriefcaseBusiness, href: "/receptionist/profile" },
];

export const HOUSEKEEPER_PAGES: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/housekeeper-dashboard" },
  { title: "My Tasks", icon: Sparkles, href: "/housekeeper/tasks" },
  { title: "Rooms", icon: Home, href: "/housekeeper/rooms" },
  { title: "Maintenance", icon: Wrench, href: "/housekeeper/maintenance" },
  { title: "Notifications", icon: Bell, href: "/housekeeper/notifications" },
  { title: "Profile", icon: BriefcaseBusiness, href: "/housekeeper/profile" },
];

export const CUSTOMER_PAGES: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/customer-dashboard" },
  { title: "Browse Rooms", icon: BedDouble, href: "/customer/rooms" },
  { title: "My Bookings", icon: CalendarCheck, href: "/customer/bookings" },
  { title: "Finance", icon: CircleDollarSign, href: "/customer/finance" },
  { title: "Maintenance", icon: Wrench, href: "/customer/maintenance" },
  { title: "Notifications", icon: Bell, href: "/customer/notifications" },
  { title: "Profile", icon: BriefcaseBusiness, href: "/customer/profile" },
];

export const ROLE_NAVIGATION = {
  [ROLES.ADMIN]: ADMIN_PAGES,
  [ROLES.MANAGER]: MANAGER_PAGES,
  [ROLES.STAFF]: RECEPTIONIST_PAGES,
  [ROLES.CUSTOMER]: CUSTOMER_PAGES,
} as const;
