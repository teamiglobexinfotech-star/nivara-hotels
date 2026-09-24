import type {
  MaintenanceReportCategory,
  MaintenanceReportPriority,
} from "./maintenance.types";

export const reportPriorityOptions: {
  id: MaintenanceReportPriority;
  name: string;
}[] = [
  { id: "LOW", name: "Low" },
  { id: "MEDIUM", name: "Medium" },
  { id: "HIGH", name: "High" },
  { id: "URGENT", name: "Urgent" },
];

export const reportCategoryOptions: {
  id: MaintenanceReportCategory;
  name: string;
}[] = [
  { id: "ELECTRICAL", name: "Electrical" },
  { id: "PLUMBING", name: "Plumbing" },
  { id: "HVAC", name: "HVAC" },
  { id: "FURNITURE", name: "Furniture" },
  { id: "APPLIANCE", name: "Appliance" },
  { id: "OTHER", name: "Other" },
];
