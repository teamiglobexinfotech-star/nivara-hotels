export type MaintenancePriority = "urgent" | "high" | "medium" | "low";

export type MaintenanceStatus =
  "pending" | "assigned" | "in-progress" | "resolved";

export interface MaintenanceTicket {
  id: string;

  room: {
    number: string;
    type: "Standard" | "Deluxe" | "Suite" | "Public Area";
  };

  issue: {
    name: string;
    description?: string;
  };

  reportedBy: {
    name: string;
    role: "Guest" | "Housekeeping" | "Front Desk" | "Manager";
    reportedAt: string;
  };

  priority: MaintenancePriority;

  status: MaintenanceStatus;
}
