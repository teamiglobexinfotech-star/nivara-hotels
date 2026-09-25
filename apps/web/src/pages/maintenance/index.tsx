import { ROLES } from "@/constants";
import { useAuth } from "@/hooks/useAuth";

import { AdminPage } from "./AdminPage";

const maintenanceByRole = {
  [ROLES.ADMIN]: AdminPage,
  [ROLES.MANAGER]: AdminPage,
  [ROLES.STAFF]: AdminPage,
};

export function MaintenancePage() {
  const { user } = useAuth();
  const Dashboard = user?.role ? maintenanceByRole[user.role] : undefined;

  if (!Dashboard) {
    return <>No Role</>;
  }

  return <Dashboard />;
}
