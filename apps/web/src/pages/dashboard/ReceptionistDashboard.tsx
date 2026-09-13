import { Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/common/Header";

export default function ReceptionistDashboard() {
  const { user } = useAuth();

  return (
    <>
      <Header
        title="Dashboard"
        highlight={`Good morning, ${user?.fullName}`}
        description="Guest arrivals, departures and front-desk tasks.."
        actions={[
          {
            label: "New Booking",
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
