import { Plus } from "lucide-react";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { NewStaffSheet } from "@/features/staff/components/NewStaffSheet";
import { StaffKpi } from "@/features/staff/components/StaffKpi";
import { StaffTableSection } from "@/features/staff/components/StaffTableSection";

export function StaffPage() {
  return (
    <>
      <SectionHeader
        title="Staff & Management"
        description="Manage hotel operational personnel, room readiness teams, and front desk staff across Nivara properties."
        rightContent={
          <>
            <NewStaffSheet>
              <Button
                id="btn-add-staff"
                variant="default"
                size="sm"
                className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Staff</span>
              </Button>
            </NewStaffSheet>
          </>
        }
      />
      <StaffKpi />
      <StaffTableSection />
    </>
  );
}
