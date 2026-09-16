import { FileText, Plus } from "lucide-react";
import { KpiSection } from "@/components/shared/KpiSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { OperationsSection } from "@/features/admin/components/OperationsSection";
import { AttentionSection } from "@/features/admin/components/AttentionSection";
import { RecentActivity } from "@/features/admin/components/RecentActivity";

export function AdminDashboardPage() {
  return (
    <>
      <SectionHeader
        eyebrow="GOOD MORNING, ALEX BROWN"
        title="Dashboard"
        description="Hotel-wide overview and attention items for today."
        rightContent={
          <>
            <Button
              id="btn-add-staff"
              variant="default"
              size="sm"
              className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Staff</span>
            </Button>
            <Button
              id="btn-view-reports"
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 rounded-full px-4 text-xs"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>View Reports</span>
            </Button>
          </>
        }
      />
      <KpiSection />
      <OperationsSection />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AttentionSection />
        <RecentActivity />
      </div>
    </>
  );
}
