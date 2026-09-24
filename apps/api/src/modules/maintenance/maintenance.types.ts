import {
  MaintenanceReportCategory,
  MaintenanceReportPriority,
  MaintenanceReportStatus,
} from '../../types';

export interface Report {
  id: string;
  reportReference: string;
  category: MaintenanceReportCategory;
  priority: MaintenanceReportPriority;
  reportedAt: Date | null;
  room: {
    id: string;
    name: string | null;
    roomNumber: string | null;
  };
  reporter: {
    id: string;
    fullName: string;
  };
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
