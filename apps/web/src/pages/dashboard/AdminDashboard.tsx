import { MessageCircleWarning, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/common/Header";
import { DashboardStats } from "@/features/admin/components/DashboardStats";
import { DashboardTodayOperations } from "@/features/admin/components/DashboardTodayOperations";
import { DashboardAttention } from "@/features/admin/components/DashboardAttention";
import { DashboardRecentActivity } from "@/features/admin/components/DashboardRecentActivity";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <>
      <Header
        title="Dashboard"
        highlight={`Good morning, ${user?.fullName}`}
        description="Real-time hotel operations, room occupancy, and daily overview."
        actions={[
          {
            label: "Add Staff",
            icon: <Plus className="size-4" />,
            onClick: () => {
              console.log("Add Staff");
            },
          },
          {
            label: "View Reports",
            variant: "outline",
            icon: <MessageCircleWarning className="size-4" />,
            onClick: () => {
              console.log("Add Reports");
            },
          },
        ]}
      />
      <DashboardStats />
      <DashboardTodayOperations />
      <div className="flex flex-col gap-8 lg:flex-row">
        <DashboardAttention />
        <DashboardRecentActivity />
      </div>
    </>
  );
}
