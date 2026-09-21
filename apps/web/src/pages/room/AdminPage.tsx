// const roomTypeColumns: Column<RoomTypeResponse>[] = [
//   {
//     header: "Name",
//     key: "name",
//     className: "flex items-center gap-x-2",
//     render: (r) => (
//       <div>
//         <p>{r?.name}</p>
//       </div>
//     ),
//   },
//   {
//     header: "Capacity",
//     key: "capacity",
//   },
//   {
//     header: "Price",
//     key: "basePrice",
//     render: (r) => <span>₹{r.basePrice}</span>,
//   },
//   {
//     header: "Status",
//     key: "status",
//     render: (r) => (
//       <Badge variant={r.status == "ACTIVE" ? "secondary" : "destructive"}>
//         {r.status[0] + r.status.slice(1).toLowerCase()}
//       </Badge>
//     ),
//   },
//   {
//     header: "Action",
//     key: "action",
//     render: (r) => <RoomTypeActionsDropdownMenu roomType={r} />,
//   },
// ];

import { Plus } from "lucide-react";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewRoomModal } from "@/features/rooms/components/NewRoomModal";
import { RoomKpi } from "@/features/rooms/components/RoomKpi";

// const roomColumns: Column<Room>[] = [
//   {
//     header: "Name",
//     key: "name",
//     className: "flex items-center gap-x-2",
//     render: (r) => (
//       <div>
//         <p>{r?.roomType?.name}</p>
//         <small className="font-mono text-muted-foreground">
//           {r.roomNumber}
//         </small>
//       </div>
//     ),
//   },
//   {
//     header: "Floor",
//     key: "floor",
//   },
//   {
//     header: "Occupancy",
//     key: "occupancyStatus",
//     render: (r) => (
//       <span>
//         {r.occupancyStatus[0] + r.occupancyStatus.slice(1).toLowerCase()}
//       </span>
//     ),
//   },
//   {
//     header: "Housekeeping",
//     key: "housekeepingStatus",
//     render: (r) => (
//       <span>
//         {r.housekeepingStatus[0] + r.housekeepingStatus.slice(1).toLowerCase()}
//       </span>
//     ),
//   },
//   {
//     header: "Status",
//     key: "status",
//     render: (r) => (
//       <Badge variant={r.isActive ? "secondary" : "destructive"}>
//         {r.isActive ? "Active" : "Inactive"}
//       </Badge>
//     ),
//   },
//   {
//     header: "Action",
//     key: "action",
//     render: () => (
//       <IconButton size={"sm"} variant={"ghost"}>
//         <EllipsisVertical />
//       </IconButton>
//     ),
//   },
// ];

// function RoomTypeActionsDropdownMenu({
//   roomType,
// }: {
//   roomType: RoomTypeResponse;
// }) {
//   const [isViewModal, setIsViewModal] = useState(false);
//   const [isUpdateModal, setIsUpdateModal] = useState(false);

//   const { handleDelete, isPending } = useDeleteRoomType();

//   return (
//     <>
//       <DropdownMenu>
//         <DropdownMenuTrigger>
//           <IconButton size={"sm"} variant={"ghost"}>
//             <EllipsisVertical />
//           </IconButton>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent align="end">
//           <DropdownMenuItem onClick={() => setIsViewModal(true)}>
//             View
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => setIsUpdateModal(true)}>
//             Edit
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             className={"text-destructive"}
//             onClick={() => handleDelete(roomType.id)}
//             disabled={isPending}
//           >
//             Delete
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       {/*  */}
//       {isUpdateModal && (
//         <UpdateRoomTypeModal
//           open={isUpdateModal}
//           onOpenChange={setIsUpdateModal}
//           roomType={roomType}
//         />
//       )}

//       {/*  */}
//       {isViewModal && (
//         <ViewRoomTypeModal
//           onOpenChange={setIsViewModal}
//           open={isViewModal}
//           roomType={roomType}
//         />
//       )}
//     </>
//   );
// }

function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Action</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <NewRoomModal>
            <Button variant="outline" className="w-full justify-center">
              <Plus className="size-4" />
              Room
            </Button>
          </NewRoomModal>

          <Button variant="secondary" className="w-full justify-center">
            <Plus className="size-4" />
            Amenity
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// function RoomTypeSection() {
//   const { items, isError, isLoading } = useRoomType();

//   return (
//     <DataTable
//       response={{ items }}
//       columns={roomTypeColumns}
//       enablePagination={false}
//       isError={isError}
//       isLoading={isLoading}
//     />
//   );
// }

// function RoomSection() {
//   const [searchInput, setSearchInput] = useState("");
//   const [page, setPage] = useState(1);
//   const search = useDebounce(searchInput, 400);
//   const { items, pagination, isError, isLoading } = useRooms({
//     page,
//     search,
//   });

//   return (
//     <DataTable
//       response={{ items, pagination }}
//       columns={roomColumns}
//       searchKey="name"
//       searchPlaceholder="Search rooms..."
//       enablePagination={true}
//       isError={isError}
//       isLoading={isLoading}
//       onPageChange={(page) => setPage(page)}
//       onSearchChange={(query) => setSearchInput(query)}
//     />
//   );
// }

// function AmenitySection() {
//   return <></>;
// }

export function AdminPage() {
  return (
    <>
      <SectionHeader
        title="Rooms"
        description="Manage room, room type and  amenity, occupancy, housekeeping status and room detail"
        rightContent={
          <>
            <NewRoomModal>
              <Button
                id="btn-add-room"
                variant="default"
                size="sm"
                className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Room</span>
              </Button>
            </NewRoomModal>
          </>
        }
      />
      <RoomKpi />
      <QuickActions />
    </>
  );
}
