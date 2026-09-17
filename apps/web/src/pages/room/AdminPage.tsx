import { EllipsisVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { DataTable } from "@/components/shared/DataTable";
import type { Column, FilterConfig } from "@/types/shared.types";
import { IconButton } from "@/components/shared/IconButton";
import { Badge } from "@/components/ui/badge";
import type { Room } from "@/types/room.types";
import { roomKpisData, roomsApiResponse } from "@/mock/room.mock";

const roomColumns: Column<Room>[] = [
  {
    header: "Name",
    key: "name",
    className: "flex items-center gap-x-2",
    render: (r) => (
      <div>
        <p>{r.name}</p>
        <small className="font-mono text-muted-foreground">
          {r.roomNumber}
        </small>
      </div>
    ),
  },
  {
    header: "Room Type",
    key: "roomTypeName",
  },
  {
    header: "Floor",
    key: "floor",
  },
  {
    header: "Occupancy Status",
    key: "occupancyStatus",
    render: (s) => (
      <span>
        {s.occupancyStatus[0] + s.occupancyStatus.slice(1).toLowerCase()}
      </span>
    ),
  },
  {
    header: "Housekeeping Status",
    key: "housekeepingStatus",
    render: (s) => (
      <span>
        {s.housekeepingStatus[0] + s.housekeepingStatus.slice(1).toLowerCase()}
      </span>
    ),
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

export const roomFilters: FilterConfig[] = [
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
      {roomKpisData.map((item) => (
        <KpiCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export function AdminPage() {
  return (
    <>
      <SectionHeader
        title="Rooms"
        description="Manage rooms availability, occupancy, housekeeping status and room detail"
        rightContent={
          <>
            <Button
              id="btn-add-room"
              variant="default"
              size="sm"
              className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Room</span>
            </Button>
            <Button
              id="btn-add-amenity"
              variant="ghost"
              size="sm"
              className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Amenity</span>
            </Button>
          </>
        }
      />
      <KpiSection />
      <DataTable
        response={roomsApiResponse}
        columns={roomColumns}
        searchKey="name"
        searchPlaceholder="Search products..."
        filters={roomFilters}
        enablePagination={true}
        onPageChange={(page) => console.log("Fetch page:", page)}
        onSearchChange={(query) => console.log("Search query:", query)}
        onFilterChange={(filters) => console.log("Applied filters:", filters)}
      />
    </>
  );
}
