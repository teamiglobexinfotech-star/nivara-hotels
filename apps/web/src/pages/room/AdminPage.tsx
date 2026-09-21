import { useState } from "react";
import {
  BedDouble,
  BrushCleaning,
  CheckCircle2,
  EllipsisVertical,
  Plus,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { DataTable } from "@/components/shared/DataTable";
import type { Column } from "@/types/shared.types";
import { IconButton } from "@/components/shared/IconButton";
import { Badge } from "@/components/ui/badge";
import type { Room, RoomType } from "@/types/room.types";
import { useStats } from "@/features/room/hooks/useStats";
import { useRooms } from "@/features/room/hooks/useRooms";
import { useDebounce } from "@/hooks/useDebounce";
import { useRoomType } from "@/features/room/hooks/useRoomType";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewRoomTypeModal } from "@/features/room-type/components/NewRoomTypeModal";

const roomTypeColumns: Column<RoomType>[] = [
  {
    header: "Name",
    key: "name",
    className: "flex items-center gap-x-2",
    render: (r) => (
      <div>
        <p>{r?.name}</p>
      </div>
    ),
  },
  {
    header: "Capacity",
    key: "capacity",
  },
  {
    header: "Price",
    key: "basePrice",
  },
  {
    header: "Status",
    key: "status",
    render: (r) => (
      <Badge variant={r.status == "ACTIVE" ? "secondary" : "destructive"}>
        {r.status[0] + r.status.slice(1).toLowerCase()}
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

const roomColumns: Column<Room>[] = [
  {
    header: "Name",
    key: "name",
    className: "flex items-center gap-x-2",
    render: (r) => (
      <div>
        <p>{r?.roomType?.name}</p>
        <small className="font-mono text-muted-foreground">
          {r.roomNumber}
        </small>
      </div>
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
      <span>
        {r.occupancyStatus[0] + r.occupancyStatus.slice(1).toLowerCase()}
      </span>
    ),
  },
  {
    header: "Housekeeping",
    key: "housekeepingStatus",
    render: (r) => (
      <span>
        {r.housekeepingStatus[0] + r.housekeepingStatus.slice(1).toLowerCase()}
      </span>
    ),
  },
  {
    header: "Status",
    key: "status",
    render: (r) => (
      <Badge variant={r.isActive ? "secondary" : "destructive"}>
        {r.isActive ? "Active" : "Inactive"}
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

function KpiSection() {
  let { data: stats } = useStats();

  const icons = [BedDouble, CheckCircle2, UserCheck, BrushCleaning];
  stats = stats?.map((s, index) => ({
    ...s,
    icon: icons[index],
  }));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {stats?.map((item) => (
        <KpiCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Action</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <NewRoomTypeModal>
            <Button className="w-full">
              <Plus className="size-4" />
              Room Type
            </Button>
          </NewRoomTypeModal>

          <Button variant="outline" className="w-full justify-center">
            <Plus className="size-4" />
            Room
          </Button>

          <Button variant="secondary" className="w-full justify-center">
            <Plus className="size-4" />
            Amenity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function RoomTypeSection() {
  const { items, isError, isLoading } = useRoomType();

  return (
    <DataTable
      response={{ items }}
      columns={roomTypeColumns}
      enablePagination={false}
      isError={isError}
      isLoading={isLoading}
    />
  );
}

function RoomSection() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const search = useDebounce(searchInput, 400);
  const { items, pagination, isError, isLoading } = useRooms({
    page,
    search,
  });

  return (
    <DataTable
      response={{ items, pagination }}
      columns={roomColumns}
      searchKey="name"
      searchPlaceholder="Search rooms..."
      enablePagination={true}
      isError={isError}
      isLoading={isLoading}
      onPageChange={(page) => setPage(page)}
      onSearchChange={(query) => setSearchInput(query)}
    />
  );
}

function AmenitySection() {
  return <></>;
}

export function AdminPage() {
  return (
    <>
      <SectionHeader
        title="Rooms"
        description="Manage room, room type and  amenity, occupancy, housekeeping status and room detail"
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
          </>
        }
      />
      <KpiSection />
      <QuickActions />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[7fr_3fr]">
        <div className="grid gap-y-8">
          <RoomTypeSection />
          <RoomSection />
        </div>
        <AmenitySection />
      </div>
    </>
  );
}
