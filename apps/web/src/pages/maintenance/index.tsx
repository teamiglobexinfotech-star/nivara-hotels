import { ROLES } from "@/constants";
import { useAuth } from "@/hooks/useAuth";

import { AdminPage } from "./AdminPage";

export function MaintenancePage() {
  const { user } = useAuth();
  if (ROLES.ADMIN == user?.role) return <AdminPage />;
  return <>No Role</>;
}
