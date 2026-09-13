import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

import { DataTable, type TableColumn } from "@/components/common/DataTable";
import type {
  MaintenancePriority,
  MaintenanceStatus,
  MaintenanceTicket,
} from "@/types/maintenance.types";
import { recentMaintenance } from "@/mock/maintenance";

const priorityVariant: Record<
  MaintenancePriority,
  "default" | "secondary" | "destructive" | "outline"
> = {
  urgent: "destructive",
  high: "destructive",
  medium: "secondary",
  low: "outline",
};

const statusVariant: Record<
  MaintenanceStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "destructive",
  assigned: "secondary",
  "in-progress": "default",
  resolved: "outline",
};

const columns: TableColumn<MaintenanceTicket>[] = [
  {
    key: "id",
    header: "Ticket ID",
    render: (_, ticket) => <span className="font-medium">{ticket.id}</span>,
  },
  {
    key: "room",
    header: "Room",
    render: (_, ticket) => (
      <div>
        <p className="font-medium">{ticket.room.number}</p>
        <p className="text-xs text-muted-foreground">{ticket.room.type}</p>
      </div>
    ),
  },
  {
    key: "issue",
    header: "Issue Name",
    render: (_, ticket) => (
      <span className="font-medium">{ticket.issue.name}</span>
    ),
  },
  {
    key: "reportedBy",
    header: "Reported By",
    render: (_, ticket) => (
      <div>
        <p>{ticket.reportedBy.name}</p>
        <p className="text-xs text-muted-foreground">
          {ticket.reportedBy.role} · {ticket.reportedBy.reportedAt}
        </p>
      </div>
    ),
  },
  {
    key: "priority",
    header: "Priority",
    render: (_, ticket) => (
      <Badge variant={priorityVariant[ticket.priority]}>
        {ticket.priority}
      </Badge>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (_, ticket) => (
      <Badge variant={statusVariant[ticket.status]}>{ticket.status}</Badge>
    ),
  },
  {
    key: "action",
    header: "Action",
    render: (_, ticket) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => console.log("View ticket:", ticket.id)}
      >
        <Eye className="mr-2 h-4 w-4" />
        View
      </Button>
    ),
  },
];

export function RecentMaintenance() {
  return (
    <DataTable
      title="Recent Maintenance"
      description="Active work orders and guest service requests"
      data={recentMaintenance}
      columns={columns}
      getRowKey={(r) => r.id}
      viewAllLabel="View All Tickets"
      onViewAll={() => {
        console.log("View all Maintenance");
      }}
    />
  );
}
