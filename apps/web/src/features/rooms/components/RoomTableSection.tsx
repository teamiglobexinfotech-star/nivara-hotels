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

import { roomsData } from "../room.mock";
import type { Room } from "../room.types";

const roomColumns: Column<Room>[] = [
  {
    header: "Room",
    key: "roomNumber",
    className: "flex items-center gap-x-2",
    render: (r) => (
      <div>
        <p className="font-medium">#{r.roomNumber}</p>
        <span className="text-sm text-muted-foreground">
          {r.name || "Unnamed Room"}
        </span>
      </div>
    ),
  },
  {
    header: "Room Type",
    key: "roomTypeId",
    render: (r) => (
      <>{r.roomType.name[0].toUpperCase() + r.roomType.name.slice(1)}</>
    ),
  },
  {
    header: "Floor",
    key: "floor",
  },
  {
    header: "Occupancy",
    key: "occupancyStatus",
    render: (r) => (
      <Badge
        variant={
          r.occupancyStatus === "OCCUPIED"
            ? "destructive"
            : r.occupancyStatus === "RESERVED"
              ? "secondary"
              : "outline"
        }
      >
        {r.occupancyStatus}
      </Badge>
    ),
  },
  {
    header: "Housekeeping",
    key: "housekeepingStatus",
    render: (r) => (
      <Badge
        variant={
          r.housekeepingStatus === "CLEAN"
            ? "secondary"
            : r.housekeepingStatus === "DIRTY"
              ? "destructive"
              : "outline"
        }
      >
        {r.housekeepingStatus}
      </Badge>
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
    header: "Created",
    key: "createdAt",
    render: (r) => (
      <span>{r.createdAt ? r.createdAt.toLocaleDateString("en-IN") : "-"}</span>
    ),
  },
  {
    header: "Action",
    key: "action",
    render: (r) => <RoomActionDropdownMenu room={r} />,
  },
];

export function RoomTableSection() {
  return (
    <DataTable
      response={{ items: roomsData }}
      columns={roomColumns}
      searchKey="fullName"
      searchPlaceholder="Search customers..."
      enablePagination={true}
      onPageChange={(page) => console.log("Fetch page:", page)}
      onSearchChange={(query) => console.log("Search query:", query)}
      onFilterChange={(filters) => console.log("Applied filters:", filters)}
    />
  );
}

function RoomActionDropdownMenu({ ..._ }: { room: Room }) {
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
          <DropdownMenuItem className={"text-destructive"}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
