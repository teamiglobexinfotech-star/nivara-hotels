import { ROLES } from "@/constants";
import { useAuth } from "@/hooks/useAuth";

import { AdminPage } from "./AdminPage";

const dashboardByRole = {
  [ROLES.ADMIN]: AdminPage,
};

export function DashboardPage() {
  const { user } = useAuth();

  const Dashboard = user?.role ? dashboardByRole[user.role] : undefined;

  if (!Dashboard) {
    return <>No Role</>;
  }

  return <Dashboard />;
}
