import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

import { DataTable } from "@/components/shared/DataTable";
import { IconButton } from "@/components/shared/IconButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/getInitials";
import type { Column } from "@/types/shared.types";

import { iconsList } from "../amenity.constants";
import type { Amenity } from "../amenity.types";
import { useAmenityList } from "../hooks/useAmenityList";
import { useDeleteAmenity } from "../hooks/useDeleteAmenity";

import { UpdateAmenityModal } from "./UpdateAmenityModal";

const amenityColumns: Column<Amenity>[] = [
  {
    header: "Amenity",
    key: "name",
    className: "flex items-center gap-x-2",
    render: (a) => {
      const Icon = iconsList[a.iconKey];

      return (
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg border bg-muted/50">
            {Icon ? (
              <Icon className="size-4" />
            ) : (
              <Avatar>
                <AvatarFallback>{getInitials(Icon)}</AvatarFallback>
              </Avatar>
            )}
          </div>

          <div>
            <p className="font-medium">{a.name}</p>
            <span className="text-sm text-muted-foreground">
              {a.description || "No description"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    header: "Icon",
    key: "iconKey",
    render: (a) => <code className="text-sm">{a.iconKey || "-"}</code>,
  },
  {
    header: "Status",
    key: "isActive",
    render: (a) => (
      <Badge variant={a.isActive ? "secondary" : "destructive"}>
        {a.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    header: "Created",
    key: "createdAt",
    render: (a) => (
      <span>{new Date(a.createdAt).toLocaleDateString("en-IN")}</span>
    ),
  },
  {
    header: "Action",
    key: "action",
    render: (a) => <AmenityActionDropdownMenu amenity={a} />,
  },
];

export function AmenityTableSection() {
  const { items } = useAmenityList();

  return (
    <DataTable
      response={{ items }}
      columns={amenityColumns}
      enablePagination={false}
      emptyMessage="No amenity found. Create your first amenity to get started."
      errorMessage="We couldn't load the amenity. Please try again."
    />
  );
}

function AmenityActionDropdownMenu({ amenity }: { amenity: Amenity }) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const { handleDelete, isDeleting } = useDeleteAmenity();

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
            onClick={() => setIsUpdateModal(true)}
            disabled={isDeleting}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"text-destructive"}
            onClick={() => handleDelete(amenity.id)}
            disabled={isDeleting}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isUpdateModal && (
        <UpdateAmenityModal
          amenity={amenity}
          open={isUpdateModal}
          onOpenChange={setIsUpdateModal}
        />
      )}
    </>
  );
}
