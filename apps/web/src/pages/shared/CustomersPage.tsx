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
import { customerKpisData, customersApiResponse } from "@/mock/customer.mock";
import type { Customer } from "@/types/customer.types";
import { NewCustomerModal } from "@/features/customer/components/NewCustomerModal";

const customerColumns: Column<Customer>[] = [
  {
    header: "Full Name",
    key: "name",
    className: "flex items-center gap-x-2",
    render: (c) => (
      <>
        <Avatar>
          <AvatarFallback>{getInitials(c.name)}</AvatarFallback>
        </Avatar>
        <span>{c.name}</span>
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
    render: () => (
      <IconButton size={"sm"} variant={"ghost"}>
        <EllipsisVertical />
      </IconButton>
    ),
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

function KpiSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {customerKpisData.map((item) => (
        <KpiCard key={item.id} item={item} />
      ))}
    </div>
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
      <DataTable
        response={customersApiResponse}
        columns={customerColumns}
        searchKey="name"
        searchPlaceholder="Search products..."
        filters={customerFilters}
        enablePagination={true}
        onPageChange={(page) => console.log("Fetch page:", page)}
        onSearchChange={(query) => console.log("Search query:", query)}
        onFilterChange={(filters) => console.log("Applied filters:", filters)}
      />
    </>
  );
}
