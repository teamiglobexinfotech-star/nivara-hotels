import { Link } from "react-router-dom";
import {
  Bell,
  Calendar,
  HelpCircle,
  IdCard,
  LayoutDashboard,
  PanelLeft,
  Settings,
  Users,
  Wallet,
  Wrench,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Logo } from "./logo";
import { ROLES } from "@/constants";
import { useAuth } from "@/hooks/useAuth";

type NavItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  isActive?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

type SidebarData = {
  navGroups: NavGroup[];
  footerGroup: NavGroup;
};

const adminLinks: SidebarData = {
  navGroups: [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Staff", icon: IdCard, href: "/staff" },
        { label: "Customers", icon: Users, href: "/customers" },
        { label: "Rooms", icon: PanelLeft, href: "/rooms" },
        { label: "Bookings", icon: Calendar, href: "/bookings" },
        { label: "Maintenance", icon: Wrench, href: "/maintenance" },
        { label: "Finance", icon: Wallet, href: "/finance" },
        { label: "Notifications", icon: Bell, href: "/notifications" },
      ],
    },
  ],
  footerGroup: {
    title: "Support",
    items: [
      { label: "Help Center", icon: HelpCircle, href: "#" },
      { label: "Settings", icon: Settings, href: "#" },
    ],
  },
};
const managerLinks: SidebarData = adminLinks;
const customerLinks: SidebarData = {
  navGroups: [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Browse Rooms", icon: PanelLeft, href: "/rooms" },
        { label: "My Bookings", icon: Calendar, href: "/bookings" },
        { label: "Finance", icon: Wallet, href: "/finance" },
        { label: "Maintenance", icon: Wrench, href: "/maintenance" },
        {
          label: "Notification",
          icon: Bell,
          href: "/notifications",
        },
        { label: "Profile", icon: User, href: "/profile" },
      ],
    },
  ],
  footerGroup: adminLinks.footerGroup,
};
const receptionistLinks: SidebarData = {
  navGroups: [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "Customers", icon: Users, href: "/customers" },
        { label: "Rooms", icon: PanelLeft, href: "/rooms" },
        { label: "Bookings", icon: Calendar, href: "/bookings" },
        { label: "Finance", icon: Wallet, href: "/finance" },
        { label: "Maintenance", icon: Wrench, href: "/maintenance" },
        { label: "Notifications", icon: Bell, href: "/notifications" },
      ],
    },
  ],
  footerGroup: adminLinks.footerGroup,
};
const housekeeperLinks: SidebarData = {
  navGroups: [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { label: "My Tasks", icon: PanelLeft, href: "/tasks" },
        { label: "Rooms", icon: Wrench, href: "/rooms" },
        { label: "Maintenance", icon: Wrench, href: "/maintenance" },
        { label: "Notifications", icon: Bell, href: "/notifications" },
      ],
    },
  ],
  footerGroup: adminLinks.footerGroup,
};

const SidebarLogo = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="p-2">
        <Link to="/">
          <Logo />
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { user } = useAuth();

  const links = () => {
    switch (ROLES[user?.role!]) {
      case ROLES.ADMIN:
        return adminLinks;
      case ROLES.MANAGER:
        return managerLinks;
      case ROLES.STAFF:
        return user?.category == "RECEPTIONIST"
          ? receptionistLinks
          : housekeeperLinks;
      default:
        return customerLinks;
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        {links()?.navGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="uppercase">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton isActive={item.isActive}>
                      <Link
                        to={item.href}
                        className="flex items-center gap-x-2"
                      >
                        <item.icon />
                        {item.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel>{adminLinks.footerGroup.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminLinks.footerGroup.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton>
                    <Link to={item.href}>{item.label}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
