import { EllipsisVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { DataTable } from "@/components/shared/DataTable";
import type { Column, FilterConfig } from "@/types/shared.types";
import { IconButton } from "@/components/shared/IconButton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/getInitials";
import { customerKpisData } from "@/mock/customer.mock";
import type { Customer } from "@/types/customer.types";
import { NewCustomerModal } from "@/features/customer/components/NewCustomerModal";
import { useCustomers } from "@/features/customer/hooks/useCustomers";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const customerColumns: Column<Customer>[] = [
  {
    header: "Full Name",
    key: "fullName",
    className: "flex items-center gap-x-2",
    render: (c) => (
      <>
        <Avatar>
          <AvatarFallback>{getInitials(c.fullName)}</AvatarFallback>
        </Avatar>
        <span>{c.fullName}</span>
      </>
    ),
  },
  {
    header: "Phone",
    key: "phone",
    render: (c) => <a href={`tel:${c.phone}`}>{c.phone}</a>,
  },
  {
    header: "Email",
    key: "email",
    render: (c) => <a href={`mailto:${c.email}`}>{c.email}</a>,
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
    render: (c) => <ActionsDropdownMenu status={c.status} />,
  },
];

export const customerFilters: FilterConfig[] = [
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

export function ActionsDropdownMenu({
  status,
}: {
  status: Customer["status"];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton size={"sm"} variant={"ghost"}>
          <EllipsisVertical />
        </IconButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem className={"text-destructive"}>
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem>
          {status == "ACTIVE" ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function KpiSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {customerKpisData.map((item) => (
        <KpiCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function ListCustomers() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const search = useDebounce(searchInput, 400);
  const { items, pagination, isError, isLoading } = useCustomers({
    page,
    search,
  });

  return (
    <DataTable
      response={{ items, pagination }}
      columns={customerColumns}
      searchKey="name"
      searchPlaceholder="Search products..."
      enablePagination={true}
      isError={isError}
      isLoading={isLoading}
      onPageChange={(page) => setPage(page)}
      onSearchChange={(query) => setSearchInput(query)}
      onFilterChange={(filters) => console.log("Applied filters:", filters)}
    />
  );
}

export function CustomersPage() {
  return (
    <>
      <SectionHeader
        title="Customers"
        description="Manage customers"
        rightContent={
          <>
            <NewCustomerModal>
              <Button
                id="btn-add-customer"
                variant="default"
                size="sm"
                className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Customer</span>
              </Button>
            </NewCustomerModal>
          </>
        }
      />
      <KpiSection />
      <ListCustomers />
    </>
  );
}
