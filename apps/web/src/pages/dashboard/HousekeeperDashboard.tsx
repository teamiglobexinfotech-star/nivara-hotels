import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/common/Header";

export default function HousekeeperDashboard() {
  const { user } = useAuth();

  return (
    <>
      <Header
        title="Dashboard"
        highlight={`Good morning, ${user?.fullName}`}
        description="Your assigned rooms and housekeeping sequence for today."
      />
    </>
  );
}
