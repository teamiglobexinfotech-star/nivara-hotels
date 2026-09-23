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
import type { Column } from "@/types/shared.types";

import { useDeleteRoomType } from "../hooks/useDeleteRoomType";
import { useRoomTypeList } from "../hooks/useRoomTypeList";
import type { RoomType } from "../roomType.types";

import { UpdateRoomTypeModal } from "./UpdateRoomTypeModal";
import { ViewRoomTypeModal } from "./ViewRoomTypeModal";

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
    render: (r) => (
      <span>{new Date(r.createdAt).toLocaleDateString("en-IN")}</span>
    ),
  },
  {
    header: "Action",
    key: "action",
    render: (r) => <RoomTypeActionDropdownMenu roomType={r} />,
  },
];

export function RoomTypeTableSection() {
  const { items } = useRoomTypeList();

  return (
    <DataTable
      response={{ items }}
      columns={roomTypeColumns}
      enablePagination={false}
      emptyMessage="No room types found. Create your first room type to get started."
      errorMessage="We couldn't load the room types. Please try again."
    />
  );
}

function RoomTypeActionDropdownMenu({ roomType }: { roomType: RoomType }) {
  const [isViewModal, setIsViewModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);

  const { handleDelete, isDeleting } = useDeleteRoomType();

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
            onClick={() => handleDelete(roomType.id)}
            disabled={isDeleting}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isViewModal && (
        <ViewRoomTypeModal
          open={isViewModal}
          onOpenChange={setIsViewModal}
          roomType={roomType}
        />
      )}

      {isUpdateModal && (
        <UpdateRoomTypeModal
          open={isUpdateModal}
          onOpenChange={setIsUpdateModal}
          roomType={roomType}
        />
      )}
    </>
  );
}
