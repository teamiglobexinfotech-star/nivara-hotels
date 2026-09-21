import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import type { Column } from "@/types/shared.types";

import { staffData } from "../staff.mock";
import type { Staff } from "../staff.types";

const staffColumns: Column<Staff>[] = [
  {
    header: "Staff Code",
    key: "staffCode",
  },
  {
    header: "Full Name",
    key: "fullName",
    className: "flex items-center gap-x-2",
    render: (r) => (
      <div>
        <p>{r.fullName}</p>
      </div>
    ),
  },
  {
    header: "Email",
    key: "email",
  },
  {
    header: "Phone",
    key: "phone",
  },
  {
    header: "Category",
    key: "category",
    render: (r) => (
      <span>
        {r.category === "HOUSEKEEPER" ? "Housekeeper" : "Receptionist"}
      </span>
    ),
  },
  {
    header: "Status",
    key: "isActive",
    render: (r) => (
      <Badge variant={r.isActive ? "secondary" : "destructive"}>
        {r.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    header: "Joined At",
    key: "joinedAt",
    render: (r) => <span>{r.joinedAt.toLocaleDateString("en-IN")}</span>,
  },
];

export function StaffTableSection() {
  return (
    <DataTable
      response={{ items: staffData }}
      columns={staffColumns}
      searchKey="name"
      searchPlaceholder="Search products..."
      enablePagination={true}
      onPageChange={(page) => console.log("Fetch page:", page)}
      onSearchChange={(query) => console.log("Search query:", query)}
      onFilterChange={(filters) => console.log("Applied filters:", filters)}
    />
  );
}
