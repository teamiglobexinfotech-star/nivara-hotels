import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stats } from "@/features/admin/components/Stats";
import { RecentBookings } from "@/features/admin/components/RecentBookings";
import { RecentMaintenance } from "@/features/admin/components/RecentMaintenance";

export function DashboardHeader() {
  const dashboardData = {
    userName: "Arjun",
    title: "Dashboard",
    description:
      "Real-time hotel operations, room occupancy, and daily overview.",
    date: "September 9, 2026",
  };

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left */}
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
          Good morning, {dashboardData.userName}
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
          {dashboardData.title}
        </h1>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
          {dashboardData.description}
        </p>
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-2 self-start sm:self-auto">
        {/* Date */}
        <div className="hidden h-9 items-center gap-2 rounded-md border bg-muted/50 px-3 text-sm text-muted-foreground sm:flex">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />

          <span className="font-medium whitespace-nowrap">
            {dashboardData.date}
          </span>
        </div>

        {/* New Booking */}
        <Button type="button" className="h-9 gap-2 px-4 text-sm font-semibold">
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>New Booking</span>
        </Button>
      </div>
    </header>
  );
}

export default function AdminDashboard() {
  return (
    <>
      <DashboardHeader />
      <Stats />
      <RecentBookings />
      <RecentMaintenance />
    </>
  );
}
