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

import { useDeleteStaff } from "../hooks/useDeleteStaff";
import { useStaffList } from "../hooks/useStaffList";
import type { StaffList } from "../staff.types";

import { UpdateStaffSheet } from "./UpdateStaffSheet";
import { ViewStaffSheet } from "./ViewStaffSheet";

const staffColumns: Column<StaffList>[] = [
  {
    header: "Fulll Name",
    key: "fullName",
    className: "flex items-center gap-x-2",
    render: (r) => (
      <div>
        <p className="font-medium">{r.fullName}</p>
        {r.staffCode && (
          <span className="text-sm text-muted-foreground">#{r.staffCode}</span>
        )}
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
    header: "Created At",
    key: "createdAt",
    render: (r) => (
      <span>{new Date(r.createdAt).toLocaleDateString("en-IN")}</span>
    ),
  },
  {
    header: "Action",
    key: "action",
    render: (s) => <StaffActionDropdownMenu staff={s} />,
  },
];

export function StaffTableSection() {
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const query = useDebounce(search, 400);
  const { items, pagination } = useStaffList({ search: query, page });

  return (
    <DataTable
      response={{ items, pagination }}
      columns={staffColumns}
      searchKey="name"
      searchPlaceholder="Search..."
      enablePagination={true}
      onPageChange={(page) => setPage(page)}
      onSearchChange={(query) => setSearch(query)}
    />
  );
}

function StaffActionDropdownMenu({ staff }: { staff: StaffList }) {
  const [isViewModal, setIsViewModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const { handleDelete, isDeleting } = useDeleteStaff();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton size={"sm"} variant={"ghost"}>
            <EllipsisVertical />
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setIsViewModal(true)}
            disabled={isDeleting}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsUpdateModal(true)}
            disabled={isDeleting}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"text-destructive"}
            onClick={() => handleDelete(staff.id)}
            disabled={isDeleting}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isUpdateModal && (
        <UpdateStaffSheet
          isOpen={isUpdateModal}
          onOpenChange={setIsUpdateModal}
          id={staff.id}
        />
      )}

      {isViewModal && (
        <ViewStaffSheet
          isOpen={isViewModal}
          onOpenChange={setIsViewModal}
          id={staff.id}
        />
      )}
    </>
  );
}
