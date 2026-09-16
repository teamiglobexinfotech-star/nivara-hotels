import { DataTable, type DataTableColumn } from "@/components/shared/DataTable";
import { CheckCircle2, Clock } from "lucide-react";

export type OperationStatus = "Pending" | "Confirmed" | "Completed";
export type OperationActivity = "Check-in" | "Check-out";

export type Operation = {
  id: number;
  guest: string;
  room: string;
  activity: OperationActivity;
  time: string;
  status: OperationStatus;
};

export const operations: Operation[] = [
  {
    id: 1,
    guest: "Aarav Mehta",
    room: "204",
    activity: "Check-in",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    guest: "Priya Sharma",
    room: "312",
    activity: "Check-out",
    time: "11:00 AM",
    status: "Pending",
  },
  {
    id: 3,
    guest: "Rohan Kapoor",
    room: "118",
    activity: "Check-in",
    time: "12:15 PM",
    status: "Confirmed",
  },
  {
    id: 4,
    guest: "Ananya Singh",
    room: "405",
    activity: "Check-out",
    time: "1:30 PM",
    status: "Completed",
  },
  {
    id: 5,
    guest: "Vikram Patel",
    room: "221",
    activity: "Check-in",
    time: "2:00 PM",
    status: "Pending",
  },
];

const operationsColumns: DataTableColumn<Operation>[] = [
  {
    key: "guest",
    header: "Guest",
    className: "font-medium text-foreground",
  },
  {
    key: "room",
    header: "Room",
    className: "font-mono text-muted-foreground",
  },
  {
    key: "activity",
    header: "Activity",
    render: (op) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
          op.activity === "Check-in"
            ? "border border-primary/20 bg-primary/10 text-primary"
            : "border border-border bg-muted text-muted-foreground"
        }`}
      >
        {op.activity}
      </span>
    ),
  },
  {
    key: "time",
    header: "Time",
    className: "text-muted-foreground font-light",
  },
  {
    key: "status",
    header: "Status",
    render: (op) => (
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-medium ${
          op.status === "Confirmed"
            ? "text-foreground"
            : op.status === "Pending"
              ? "text-muted-foreground"
              : "text-primary"
        }`}
      >
        {op.status === "Confirmed" && (
          <CheckCircle2 className="h-3 w-3 text-primary" />
        )}

        {op.status === "Pending" && (
          <Clock className="h-3 w-3 text-muted-foreground" />
        )}

        <span>{op.status}</span>
      </span>
    ),
  },
  {
    key: "actions",
    header: "Quick Action",
    className: "text-right",
    render: (op) => (
      <>
        {op.status === "Pending" ? (
          <button className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-medium text-primary-foreground transition-opacity hover:opacity-90">
            Confirm
          </button>
        ) : op.status === "Confirmed" ? (
          <button className="rounded-full bg-muted px-2.5 py-1 text-[10px] text-foreground transition-colors hover:bg-muted/80">
            Mark Done
          </button>
        ) : (
          <span className="text-[10px] text-muted-foreground">Done</span>
        )}
      </>
    ),
  },
];

export function OperationsSection() {
  return (
    <DataTable
      title="Today's Operations"
      description="Real-time guest arrivals and departure sequencing."
      columns={operationsColumns}
      data={operations}
      maxRows={4}
      getRowKey={(op) => op.id}
      onAction={() => {}}
      actionText="View all"
      error={""}
      emptyText="No operations scheduled for today."
    />
  );
}
