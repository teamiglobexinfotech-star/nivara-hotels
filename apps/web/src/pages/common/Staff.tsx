import { Plus } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/common/Header";
import { SearchToolbar } from "@/components/common/SearchToolbar";
import { DataTable, type TableColumn } from "@/components/common/DataTable";
import { staffData } from "@/mock/staffs";
import { getInitials } from "@/lib/getInitials";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function StaffSearchToolbar() {
  const [search, setSearch] = useState("");

  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    role: "all",
    category: "all",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const categories = [
    {
      key: "category",
      title: "Category",
      options: [
        { value: "all", label: "All" },
        { value: "manager", label: "Manager" },
        { value: "housekeeper", label: "Housekeeper" },
        { value: "receptionist", label: "Receptionist" },
      ],
    },
  ];

  return (
    <SearchToolbar
      search={search}
      onSearchChange={setSearch}
      placeholder="Search staff by name, phone or ID..."
      filters={categories}
      filterValues={filterValues}
      onFilterChange={handleFilterChange}
    />
  );
}

export type StaffCategory = "manager" | "housekeeper" | "receptionist";

export type StaffStatus = "active" | "inactive";

export type Staff = {
  id: string;
  name: string;
  category: StaffCategory;
  contact: string;
  status: StaffStatus;
};

const staffColumns: TableColumn<Staff>[] = [
  {
    key: "name",
    header: "Name",

    render: (_, staff) => (
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground">
          {getInitials(staff.name)}
        </div>
        <span className="text-sm font-medium whitespace-nowrap text-foreground">
          {staff.name}
        </span>
      </div>
    ),
  },

  {
    key: "category",
    header: "category",
    render: (value) => (
      <span className="text-sm font-medium whitespace-nowrap text-foreground capitalize">
        {String(value)}
      </span>
    ),
  },

  {
    key: "contact",
    header: "Contact",
    render: (_, staff) => (
      <span className="text-sm font-medium whitespace-nowrap text-foreground">
        {staff.contact}
      </span>
    ),
  },

  {
    key: "status",
    header: "Status",

    render: (_, staff) => {
      return (
        <Badge
          variant={staff?.status == "active" ? "secondary" : "destructive"}
          className="capitalize"
        >
          {staff.status}
        </Badge>
      );
    },
  },

  {
    key: "action",
    header: "Action",
    headerClassName: "text-right",
    className: "text-right",

    render: (_) => {
      return (
        <Button type="button" size="sm" onClick={() => {}}>
          View
        </Button>
      );
    },
  },
];

function StaffList() {
  return (
    <DataTable
      title="Today's Operations"
      description="Live guest arrivals, departures, and operational status"
      data={staffData}
      columns={staffColumns}
      getRowKey={(staff) => staff.id}
      footerText="Showing 1-8 of 24 staff members"
      page={2}
      onNextPage={() => {}}
      onPreviousPage={() => {}}
      totalPages={20}
    />
  );
}

export default function Staff() {
  return (
    <>
      <Header
        title="Staff Management"
        description="Manage hotel staff and their assigned categories under the unified system role."
        actions={[
          {
            label: "Add Staff",
            icon: <Plus className="size-4" />,
            onClick: () => {
              console.log("Add Staff");
            },
          },
        ]}
      />
      <StaffSearchToolbar />
      <StaffList />
    </>
  );
}
