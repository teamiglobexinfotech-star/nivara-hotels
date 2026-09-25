import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Report } from "../maintenance.types";

type UpdateReportModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: Report;
};

export function UpdateReportModal({
  open,
  onOpenChange,
}: UpdateReportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Update Report
          </DialogTitle>
          <DialogDescription>
            Enter the report details below to update report.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
