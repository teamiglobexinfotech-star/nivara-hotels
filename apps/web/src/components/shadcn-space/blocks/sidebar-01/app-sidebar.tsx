import { Link } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavMain } from "@/components/shadcn-space/blocks/sidebar-01/nav-main";
import { Logo } from "@/components/shared/Logo";
import { ADMIN_PAGES, ROLES } from "@/constants";
import { ArrowUpRight, ExternalLink, Shield } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/getInitials";

export function AppSidebar() {
  const fullName = "Alex Brown";
  const currentRole = ROLES.ADMIN;

  return (
    <Sidebar className="h-full bg-muted px-0 **:data-[slot=sidebar-inner]:h-full">
      <div className="flex flex-col gap-6">
        <SidebarHeader className="border-b p-3">
          <SidebarMenu>
            <SidebarMenuItem className="pl-4">
              <Link to="/" className="h-full w-full">
                <Logo />
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent className="overflow-hidden">
          <ScrollArea className="relative h-[calc(100vh-150px)] md:h-[calc(100vh-100px)]">
            <div className="px-4">
              <NavMain items={ADMIN_PAGES} />
            </div>
            <div className="absolute bottom-0 w-full space-y-3 border-t border-border/80 p-4 pb-0">
              <Link
                to="/"
                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Public</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </Link>

              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/10 px-3 py-2">
                <Avatar>
                  <AvatarFallback className={"bg-primary text-background"}>
                    {getInitials(fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-foreground">
                    {fullName}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {currentRole}
                  </p>
                </div>
                <Shield className="h-3.5 w-3.5 shrink-0 text-primary" />
              </div>
            </div>
          </ScrollArea>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
