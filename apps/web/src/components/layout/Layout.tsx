import { Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuth } from "@/hooks/useAuth";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Layout() {
  const { user } = useAuth();
  const initials = user?.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1 lg:hidden" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Overview</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
              <Button variant="ghost">
                <Bell className="h-4 w-4" />
              </Button>

              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-x-4 gap-y-4 p-4 md:gap-y-8 md:p-8">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
