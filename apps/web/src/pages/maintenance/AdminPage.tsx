import { Plus } from "lucide-react";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { NewReportModal } from "@/features/maintenance/components/NewReportModal";
import { ReportKpi } from "@/features/maintenance/components/ReportKpi";
import { ReportTableSection } from "@/features/maintenance/components/ReportTableSection";

export function AdminPage() {
  return (
    <>
      <SectionHeader
        title="Maintenance"
        description="Manage maintenance report, assign maintenance to room, view maintenance report and view room maintenance"
        rightContent={
          <>
            <NewReportModal>
              <Button id="btn-add-report" variant="default" size="sm">
                <Plus className="h-3.5 w-3.5" />
                <span>New Report</span>
              </Button>
            </NewReportModal>
          </>
        }
      />
      <ReportKpi />
      <ReportTableSection />
    </>
  );
}
