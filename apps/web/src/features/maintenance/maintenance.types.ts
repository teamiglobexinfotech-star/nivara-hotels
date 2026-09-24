export type MaintenanceReportCategory =
  "ELECTRICAL" | "PLUMBING" | "HVAC" | "FURNITURE" | "APPLIANCE" | "OTHER";

export type MaintenanceReportPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type MaintenanceReportStatus =
  "REPORTED" | "ASSIGNED" | "IN_PROGRESS" | "COMPLETED" | "RESOLVED";

export interface Report {
  id: string;
  reportReference: string;
  room: {
    id: string;
    name: string;
    roomNumber: string;
  };
  category: MaintenanceReportCategory;
  priority: MaintenanceReportPriority;
  reporter: {
    id: string;
    fullName: string;
  };
  reportedAt: Date;
  assignee: {
    id: string;
    fullName: string;
  } | null;
  status: MaintenanceReportStatus;
}

export type ReportList = Report;

export type ReportDetails = Report & {
  description: string;
  startedAt: Date | null;
  completedAt: Date | null;
  resolvedAt: Date | null;
};
