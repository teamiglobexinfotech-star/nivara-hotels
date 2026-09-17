import { EllipsisVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { staffApiResponse, staffKpiData } from "@/mock/staff.mock";
import { DataTable } from "@/components/shared/DataTable";
import type { StaffMember } from "@/types/staff.types";
import type { Column, FilterConfig } from "@/types/shared.types";
import { IconButton } from "@/components/shared/IconButton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/getInitials";
import { NewStaffSheet } from "@/features/staff/components/NewStaffSheet";

const staffColumns: Column<StaffMember>[] = [
  {
    header: "Staff",
    key: "name",
    className: "flex items-center gap-x-2",
    render: (s) => (
      <>
        <Avatar>
          <AvatarFallback>{getInitials(s.name)}</AvatarFallback>
        </Avatar>
        <span>{s.name}</span>
      </>
    ),
  },
  {
    header: "Phone",
    key: "phone",
  },
  {
    header: "Role",
    key: "role",
    render: (s) => (
      <Badge variant={"outline"}>
        {s.role[0] + s.role.slice(1).toLowerCase()}
      </Badge>
    ),
  },
  {
    header: "Status",
    key: "status",
    render: (s) => (
      <Badge variant={s.status == "ACTIVE" ? "secondary" : "destructive"}>
        {s.status[0] + s.status.slice(1).toLowerCase()}
      </Badge>
    ),
  },
  {
    header: "Action",
    key: "action",
    render: () => (
      <IconButton size={"sm"} variant={"ghost"}>
        <EllipsisVertical />
      </IconButton>
    ),
  },
];

export const staffFilters: FilterConfig[] = [
  {
    key: "role",
    placeholder: "All roles",
    options: [
      { label: "All", value: "all" },
      { label: "HOUSEKEEPER", value: "Housekeeper" },
      { label: "RECEPTIONIST", value: "Receptionist" },
    ],
  },
  {
    key: "status",
    placeholder: "All statuses",
    options: [
      { label: "All", value: "all" },
      { label: "ACTIVE", value: "active" },
      { label: "INACTIVE", value: "inactive" },
    ],
  },
];

function KpiSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {staffKpiData.map((item) => (
        <KpiCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export function StaffPage() {
  return (
    <>
      <SectionHeader
        title="Staff & Management"
        description="Manage hotel operational personnel, room readiness teams, and front desk staff across Nivara properties."
        rightContent={
          <>
            <NewStaffSheet>
              <Button
                id="btn-add-staff"
                variant="default"
                size="sm"
                className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Staff</span>
              </Button>
            </NewStaffSheet>
          </>
        }
      />
      <KpiSection />
      <DataTable
        response={staffApiResponse}
        columns={staffColumns}
        searchKey="name"
        searchPlaceholder="Search products..."
        filters={staffFilters}
        enablePagination={true}
        onPageChange={(page) => console.log("Fetch page:", page)}
        onSearchChange={(query) => console.log("Search query:", query)}
        onFilterChange={(filters) => console.log("Applied filters:", filters)}
      />
    </>
  );
}
