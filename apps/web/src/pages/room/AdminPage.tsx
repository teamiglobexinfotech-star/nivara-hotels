import { Plus } from "lucide-react";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AmenityTableSection } from "@/features/amenities/components/AmenityTableSection";
import { NewAmenityModal } from "@/features/amenities/components/NewAmenityModal";
import { NewRoomModal } from "@/features/rooms/components/NewRoomModal";
import { RoomKpi } from "@/features/rooms/components/RoomKpi";
import { RoomTableSection } from "@/features/rooms/components/RoomTableSection";
import { NewRoomTypeModal } from "@/features/roomTypes/components/NewRoomTypeModal";
import { RoomTypeTableSection } from "@/features/roomTypes/components/RoomTypeTableSection";

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

          <NewAmenityModal>
            <Button variant="secondary" className="w-full justify-center">
              <Plus className="size-4" />
              Amenity
            </Button>
          </NewAmenityModal>

          <NewRoomTypeModal>
            <Button variant="outline" className="w-full justify-center">
              <Plus className="size-4" />
              Room Type
            </Button>
          </NewRoomTypeModal>
        </div>
      </CardContent>
    </Card>
  );
}

export function AdminPage() {
  return (
    <>
      <SectionHeader
        title="Rooms"
        description="Manage room, room type and  amenity, occupancy, housekeeping status and room detail"
        rightContent={
          <>
            <NewRoomModal>
              <Button id="btn-add-room" variant="default" size="sm">
                <Plus className="h-3.5 w-3.5" />
                <span>New Room</span>
              </Button>
            </NewRoomModal>
          </>
        }
      />
      <RoomKpi />
      <QuickActions />
      <RoomTableSection />
      <RoomTypeTableSection />
      <AmenityTableSection />
    </>
  );
}
