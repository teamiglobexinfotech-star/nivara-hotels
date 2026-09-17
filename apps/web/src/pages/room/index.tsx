import { ROLES } from "@/constants";
import { AdminPage } from "./AdminPage";

export function RoomsPage() {
  if (ROLES.ADMIN == "ADMIN") return <AdminPage />;
  return <>No Role</>;
}
