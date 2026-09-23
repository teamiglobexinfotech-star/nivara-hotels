import {
  Coffee,
  Dumbbell,
  EllipsisVertical,
  Snowflake,
  Tv,
  Utensils,
  Wifi,
} from "lucide-react";

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

import { dummyAmenities } from "../amenity.mock";
import type { Amenity } from "../amenity.types";

const iconMap = {
  wifi: Wifi,
  tv: Tv,
  coffee: Coffee,
  ac: Snowflake,
  gym: Dumbbell,
  restaurant: Utensils,
} as const;

const amenityColumns: Column<Amenity>[] = [
  {
    header: "Amenity",
    key: "name",
    className: "flex items-center gap-x-2",
    render: (a) => {
      const Icon =
        a.iconKey && a.iconKey in iconMap
          ? iconMap[a.iconKey as keyof typeof iconMap]
          : a.iconKey;

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
    render: (a) => <span>{a.createdAt.toLocaleDateString("en-IN")}</span>,
  },
  {
    header: "Action",
    key: "action",
    render: (a) => <AmenityActionDropdownMenu amenity={a} />,
  },
];

export function AmenityTableSection() {
  return (
    <DataTable
      response={{ items: dummyAmenities }}
      columns={amenityColumns}
      searchPlaceholder="Search customers..."
      enablePagination={false}
    />
  );
}

function AmenityActionDropdownMenu({ ..._ }: { amenity: Amenity }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton size={"sm"} variant={"ghost"}>
            <EllipsisVertical />
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className={"text-destructive"}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
