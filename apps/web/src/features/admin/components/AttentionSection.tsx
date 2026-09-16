import { Check } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/shared/DataTable";

interface AttentionItem {
  id: string;
  item: string;
  room: string;
  status: "Urgent" | "In progress" | "Assigned" | "Pending";
}

export const attentionList: AttentionItem[] = [
  {
    id: "att-1",
    item: "AC malfunction",
    room: "304",
    status: "Urgent",
  },
  {
    id: "att-2",
    item: "Bathroom pipe leakage",
    room: "212",
    status: "In progress",
  },
  {
    id: "att-3",
    item: "Room 118 maintenance",
    room: "118",
    status: "Assigned",
  },
  {
    id: "att-4",
    item: "Room 208 needs cleaning",
    room: "208",
    status: "Pending",
  },
  {
    id: "att-5",
    item: "Balcony door latch loose",
    room: "402",
    status: "Assigned",
  },
];

const attentionListColumns: DataTableColumn<AttentionItem>[] = [
  {
    key: "item",
    header: "Item",
    className: "py-3 px-3 font-medium",
  },
  {
    key: "room",
    header: "Room",
    className: "py-2.5 px-3 font-medium",
  },
  {
    key: "status",
    header: "Status",
    render: (attention) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase ${
          attention.status === "Urgent"
            ? "border border-destructive/30 bg-destructive/15 text-destructive"
            : attention.status === "In progress"
              ? "border border-primary/30 bg-primary/15 text-primary"
              : "border border-border bg-muted text-muted-foreground"
        }`}
      >
        {attention.status}
      </span>
    ),
  },

  {
    key: "resolve",
    header: "Resolve",
    render: () => (
      <button
        className="rounded-full p-1 text-muted-foreground transition-colors hover:text-primary"
        title="Mark as resolved"
        aria-label="Mark as resolved"
      >
        <Check className="h-3.5 w-3.5" />
      </button>
    ),
  },
];

export function AttentionSection() {
  return (
    <DataTable
      title="Attention Needed"
      description="Time-sensitive room and guest comfort alerts."
      columns={attentionListColumns}
      data={attentionList}
      maxRows={4}
      getRowKey={(op) => op.id}
      onAction={() => {}}
      actionText="View all"
      error={""}
      emptyText="No operations scheduled for today."
    />
  );
}
