import { useState } from "react";
import { EllipsisVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { DataTable } from "@/components/shared/DataTable";
import type { Column } from "@/types/shared.types";
import { IconButton } from "@/components/shared/IconButton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/getInitials";
import { customerKpisData } from "@/mock/customer.mock";
import type { Customer } from "@/types/customer.types";
import { NewCustomerModal } from "@/features/customer/components/NewCustomerModal";
import { useCustomers } from "@/features/customer/hooks/useCustomers";
import { useDebounce } from "@/hooks/useDebounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateCustomerModal } from "@/features/customer/components/UpdateCustomerModal";
import { useDeleteCustomer } from "@/features/customer/hooks/useDeleteCustomer";
import { ViewCustomerModal } from "@/features/customer/components/ViewCustomerModal";

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
    render: (c) => <ActionsDropdownMenu customer={c} />,
  },
];

function ActionsDropdownMenu({ customer }: { customer: Customer }) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);

  const { deleteCustomer, isDeleting } = useDeleteCustomer();

  function handleDeleteCustomer() {
    deleteCustomer(customer.id);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton size={"sm"} variant={"ghost"}>
            <EllipsisVertical />
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsViewModal(true)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsUpdateModal(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"text-destructive"}
            onClick={handleDeleteCustomer}
            disabled={isDeleting}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/*  */}
      <UpdateCustomerModal
        open={isUpdateModal}
        onOpenChange={setIsUpdateModal}
        customer={customer}
      />

      {/*  */}
      {isViewModal && (
        <ViewCustomerModal
          onOpenChange={setIsViewModal}
          open={isViewModal}
          id={customer.id}
        />
      )}
    </>
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
      {/* <KpiSection /> */}
      <ListCustomers />
    </>
  );
}
