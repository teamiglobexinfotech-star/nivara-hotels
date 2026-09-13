import { useAuth } from "@/hooks/useAuth";
import { CATEGORIES, ROLES } from "@/constants";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import ReceptionistDashboard from "./ReceptionistDashboard";
import HousekeeperDashboard from "./HousekeeperDashboard";
import CustomerDashboard from "./CustomerDashboard";

export default function Dashboard() {
  const { user } = useAuth();

  if (user?.role === ROLES.ADMIN) return <AdminDashboard />;
  else if (user?.role === ROLES.MANAGER) return <ManagerDashboard />;
  else if (
    user?.role == ROLES.STAFF &&
    user.category == CATEGORIES.RECEPTIONIST
  )
    return <ReceptionistDashboard />;
  else if (user?.role == ROLES.STAFF && user.category == CATEGORIES.HOUSEKEEPER)
    return <HousekeeperDashboard />;
  else if (user?.role === ROLES.CUSTOMER) return <CustomerDashboard />;

  return <div>No Role</div>;
}
