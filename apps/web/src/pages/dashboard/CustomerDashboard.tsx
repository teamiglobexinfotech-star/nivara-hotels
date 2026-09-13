import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/common/Header";

export default function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <>
      <Header
        title="Dashboard"
        highlight={`Good morning, ${user?.fullName}`}
        description="Manage your current stay, itinerary reservations, and financial ledger."
        actions={[
          {
            label: "New Booking",
            variant: "default",
            icon: <Plus className="size-4" />,
            onClick: () => {
              console.log("New Booking");
            },
          },
          {
            label: "New Report",
            variant: "outline",
            icon: <Plus className="size-4" />,
            onClick: () => {
              console.log("New Report");
            },
          },
        ]}
      />
    </>
  );
}
