import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "../shadcn-space/blocks/sidebar-01/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { FullScreenLoader } from "../shared/FullScreenLoader";
import { ProfileDropdown } from "../shared/ProfileDropdown";

export function ProtectLayout() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const { isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname?.split("/")[1];
    setActiveTab(pathname);
  }, [location]);

  if (isLoading) return <FullScreenLoader />;

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border/80 bg-muted px-4 py-3 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="cursor-pointer md:hidden" />
            {/* Breadcrumb: Overview > Dashboard */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-muted-foreground">Overview</span>
              <span className="text-muted-foreground/60">›</span>
              <span className="font-medium text-foreground capitalize">
                {activeTab}
              </span>
            </div>
          </div>

          {/* Right Header: Notification Bell & Initials Avatar AB */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/notifications">
              <button
                className="relative rounded-full border border-border bg-card p-2 text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground"
                title="3 unread notifications"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
              </button>
            </Link>
            <ProfileDropdown />
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:space-y-8 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
