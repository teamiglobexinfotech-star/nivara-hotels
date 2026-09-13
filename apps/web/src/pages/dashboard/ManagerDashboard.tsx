import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/common/Header";

export default function ManagerDashboard() {
  const { user } = useAuth();

  return (
    <>
      <Header
        title="Dashboard"
        highlight={`Good morning, ${user?.fullName}`}
        description="Hotel operations, floor turnover and immediate priority dispatches."
        actions={[
          {
            label: "Add Staff",
            icon: <Plus className="size-4" />,
            onClick: () => {
              console.log("Add Staff");
            },
          },
          {
            label: "New Booking",
            variant: "outline",
            icon: <Plus className="size-4" />,
            onClick: () => {
              console.log("New Booking");
            },
          },
        ]}
      />
    </>
  );
}
