import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { BookingKpi } from "@/features/bookings/components/BookingKpi";
import { BookingTableSection } from "@/features/bookings/components/BookingTableSection";

export function AdminPage() {
  return (
    <>
      <SectionHeader
        title="Bookings"
        description="Manage and track all hotel reservations."
        rightContent={
          <>
            <Link to="/dashboard/bookings/new">
              <Button
                id="btn-add-booking"
                variant="default"
                size="sm"
                className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Booking</span>
              </Button>
            </Link>
          </>
        }
      />
      <BookingKpi />
      <BookingTableSection />
    </>
  );
}
