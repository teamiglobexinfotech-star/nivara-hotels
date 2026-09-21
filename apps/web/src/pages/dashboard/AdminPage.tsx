import { Plus } from "lucide-react";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { AdminKpi } from "@/features/dashboard/components/AdminKpi";
import { RecentBookingsSection } from "@/features/dashboard/components/RecentBookingsSection";
import { RecentPaymentsSection } from "@/features/dashboard/components/RecentPaymentsSection";
import { NewRoomModal } from "@/features/rooms/components/NewRoomModal";
import { useAuth } from "@/hooks/useAuth";

export function AdminPage() {
  const { user } = useAuth();
  return (
    <>
      <SectionHeader
        eyebrow={`Good Morning, ${user?.fullName}`}
        title="Dashboard"
        description=""
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
      <AdminKpi />
      <RecentBookingsSection />
      <RecentPaymentsSection />
    </>
  );
}
