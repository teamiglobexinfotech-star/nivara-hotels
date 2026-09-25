import { ROLES } from "@/constants";
import { useAuth } from "@/hooks/useAuth";

import { AdminPage } from "./AdminPage";

const bookingByRole = {
  [ROLES.ADMIN]: AdminPage,
  [ROLES.MANAGER]: AdminPage,
};

export function BookingsPage() {
  const { user } = useAuth();

  const Dashboard = user?.role ? bookingByRole[user.role] : undefined;

  if (!Dashboard) {
    return <>No Role</>;
  }

  return <Dashboard />;
}
