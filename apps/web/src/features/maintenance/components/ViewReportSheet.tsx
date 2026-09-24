import { ErrorModal } from "@/components/shared/ErrorModal";
import { FullScreenLoader } from "@/components/shared/FullScreenLoader";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useReport } from "../hooks/useReport";

type ViewReportSheetProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
};

export function ViewReportSheet({
  isOpen,
  onOpenChange,
  id,
}: ViewReportSheetProps) {
  const { report, isLoading, isError, refetch } = useReport(id);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError) {
    return (
      <ErrorModal
        open={!isError}
        onOpenChange={onOpenChange}
        onRefetch={refetch}
      />
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-bold">
            Maintenance Report
          </SheetTitle>
          <SheetDescription>
            Details for report {report?.reportReference}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Basic Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Report Reference:
                </p>
                <p className="font-medium">{report?.reportReference}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">{report?.status}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{report?.category}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Priority</p>
                <p className="font-medium">{report?.priority}</p>
              </div>
            </div>
          </section>

          {/* Room */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Room
            </h3>

            <div className="rounded-lg border p-4">
              <p className="font-medium">{report?.room?.name}</p>
              <p className="text-sm text-muted-foreground">
                Room {report?.room?.roomNumber}
              </p>
            </div>
          </section>

          {/* People */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              People
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Reported By</p>
                <p className="font-medium">{report?.reporter?.fullName}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Assigned To</p>
                <p className="font-medium">
                  {report?.assignee?.fullName ?? "Unassigned"}
                </p>
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Description
            </h3>

            <div className="rounded-lg border bg-muted/30 p-4 text-sm">
              {report?.description || "No description provided."}
            </div>
          </section>

          {/* Timeline */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Timeline
            </h3>

            <div className="space-y-4">
              {report?.reportedAt && (
                <TimelineItem label="Reported At" date={report?.reportedAt} />
              )}

              {report?.startedAt && (
                <TimelineItem label="Started At" date={report.startedAt} />
              )}

              {report?.completedAt && (
                <TimelineItem label="Completed At" date={report.completedAt} />
              )}
              {report?.resolvedAt && (
                <TimelineItem label="Resolved At" date={report.resolvedAt} />
              )}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function TimelineItem({ label, date }: { label: string; date: Date | null }) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span className="text-sm font-medium">
        {date
          ? new Intl.DateTimeFormat("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(date))
          : "—"}
      </span>
    </div>
  );
}
