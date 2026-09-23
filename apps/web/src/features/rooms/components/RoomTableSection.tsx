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

import { useDeleteRoom } from "../hooks/useDeleteRoom";
import { useRoomList } from "../hooks/useRoomList";
import type { RoomList } from "../room.types";

import { UpdateRoomModal } from "./UpdateRoomModal";
import { ViewRoomModal } from "./ViewRoomModal";

const roomColumns: Column<RoomList>[] = [
  {
    header: "Room",
    key: "roomNumber",
    className: "flex items-center gap-x-2",
    render: (r) => (
      <div>
        <p className="font-medium">#{r.roomNumber}</p>
        <span className="text-sm text-muted-foreground">
          {r?.name || "Unnamed Room"}
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
      <span>
        {r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-IN") : "-"}
      </span>
    ),
  },
  {
    header: "Action",
    key: "action",
    render: (r) => <RoomActionDropdownMenu room={r} />,
  },
];

export function RoomTableSection() {
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const query = useDebounce(search, 400);
  const { items, pagination } = useRoomList({ search: query, page });

  return (
    <DataTable
      response={{ items, pagination }}
      columns={roomColumns}
      searchKey="k"
      enablePagination={true}
      onPageChange={(page) => setPage(page)}
      onSearchChange={(query) => setSearch(query)}
      emptyMessage="No room found. Create your first room  to get started."
      errorMessage="We couldn't load the room. Please try again."
    />
  );
}

function RoomActionDropdownMenu({ room }: { room: RoomList }) {
  const [isViewModal, setIsViewModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const { handleDelete, isDeleting } = useDeleteRoom();

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
            onClick={() => handleDelete(room.id)}
            disabled={isDeleting}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isUpdateModal && (
        <UpdateRoomModal
          open={isUpdateModal}
          onOpenChange={setIsUpdateModal}
          room={room}
        />
      )}

      {isViewModal && (
        <ViewRoomModal
          open={isViewModal}
          onOpenChange={setIsViewModal}
          id={room.id}
        />
      )}
    </>
  );
}
