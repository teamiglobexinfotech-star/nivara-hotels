import { EllipsisVertical } from "lucide-react";

import { DataTable } from "@/components/shared/DataTable";
import { IconButton } from "@/components/shared/IconButton";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Column } from "@/types/shared.types";

import { useDeleteRoomType } from "../hooks/useDeleteRoomType";
import { dummyRoomTypes } from "../roomType.mock";
import type { RoomType } from "../roomType.types";

const roomTypeColumns: Column<RoomType>[] = [
  {
    header: "Room Type",
    key: "name",
    className: "flex items-center gap-x-2",
    render: (r) => (
      <div>
        <p className="font-medium">{r.name}</p>
        <span className="text-sm text-muted-foreground">
          {r.description || "No description"}
        </span>
      </div>
    ),
  },
  {
    header: "Capacity",
    key: "capacity",
    render: (r) => (
      <span>
        {r.capacity} {r.capacity === 1 ? "Guest" : "Guests"}
      </span>
    ),
  },
  {
    header: "Base Price",
    key: "basePrice",
    render: (r) => <span>₹{r.basePrice.toLocaleString("en-IN")}/night</span>,
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
    header: "Created",
    key: "createdAt",
    render: (r) => <span>{r.createdAt.toLocaleDateString("en-IN")}</span>,
  },
  {
    header: "Action",
    key: "action",
    render: (r) => <RoomTypeActionDropdownMenu roomType={r} />,
  },
];

export function RoomTypeTableSection() {
  return (
    <DataTable
      response={{ items: dummyRoomTypes }}
      columns={roomTypeColumns}
      searchKey="fullName"
      searchPlaceholder="Search customers..."
      enablePagination={true}
      onPageChange={(page) => console.log("Fetch page:", page)}
      onSearchChange={(query) => console.log("Search query:", query)}
      onFilterChange={(filters) => console.log("Applied filters:", filters)}
    />
  );
}

function RoomTypeActionDropdownMenu({ roomType }: { roomType: RoomType }) {
  const { handleDelete, isPending } = useDeleteRoomType();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton size={"sm"} variant={"ghost"}>
            <EllipsisVertical />
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem
            className={"text-destructive"}
            onClick={() => handleDelete(roomType.id)}
            disabled={isPending}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
