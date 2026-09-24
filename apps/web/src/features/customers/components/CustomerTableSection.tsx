import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

import { DataTable } from "@/components/shared/DataTable";
import { IconButton } from "@/components/shared/IconButton";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/useDebounce";
import type { Column } from "@/types/shared.types";

import type { Customer } from "../customer.types";
import { useCustomerList } from "../hooks/useCustomerList";
import { useDeleteCustomer } from "../hooks/useDeleteCustomer";

import { UpdateCustomerModal } from "./UpdateCustomerModal";
import { ViewCustomerModal } from "./ViewCustomerModal";

const customerColumns: Column<Customer>[] = [
  {
    header: "Name",
    key: "fullName",
    className: "flex items-center gap-x-2",
    render: (r) => (
      <div>
        <p className="font-medium">{r.fullName}</p>
        <span className="text-sm text-muted-foreground">{r.email}</span>
      </div>
    ),
  },
  {
    header: "Phone",
    key: "phone",
  },
  {
    header: "Last Login",
    key: "lastLoginAt",
    render: (r) => (
      <span>
        {r.lastLoginAt ? r.lastLoginAt.toLocaleDateString("en-IN") : "Never"}
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
    header: "Joined",
    key: "createdAt",
    render: (r) => (
      <span>
        {r.createdAt && new Date(r.createdAt).toLocaleDateString("en-IN")}
      </span>
    ),
  },
  {
    header: "Action",
    key: "action",
    render: (c) => <ActionsDropdownMenu customer={c} />,
  },
];

export function CustomerTableSection() {
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const query = useDebounce(search, 400);
  const { items, pagination } = useCustomerList({ search: query, page });

  return (
    <DataTable
      response={{ items, pagination }}
      columns={customerColumns}
      searchKey="name"
      searchPlaceholder="Search..."
      enablePagination={true}
      onPageChange={(page) => setPage(page)}
      onSearchChange={(query) => setSearch(query)}
      emptyMessage="No customers found. Create your first customer."
      errorMessage="We couldn't load the customers. Please try again later."
    />
  );
}

function ActionsDropdownMenu({ customer }: { customer: Customer }) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [isViewModal, setIsViewModal] = useState(false);
  const { handleDelete, isDeleting } = useDeleteCustomer();

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
            onClick={() => handleDelete(customer.id)}
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
