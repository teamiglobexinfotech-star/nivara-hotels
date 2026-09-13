import {
  AttentionNeeded,
  type AttentionItem,
} from "@/components/common/AttentionNeeded";
import { Snowflake, Droplets, Broom } from "lucide-react";

const attentionItems: AttentionItem[] = [
  {
    id: "MT-1042",
    title: "AC malfunction",
    room: "Room 304",
    reportedBy: "Reported by Guest",
    time: "18m ago",
    status: "urgent",
    actionLabel: "Resolve",
    icon: <Snowflake className="size-4" />,
  },
  {
    id: "MT-1041",
    title: "Pipe leakage",
    room: "Room 212",
    reportedBy: "Assigned to Suresh M.",
    time: "45m ago",
    status: "in-progress",
    actionLabel: "Update",
    icon: <Droplets className="size-4" />,
  },
  {
    id: "MT-1040",
    title: "Room cleaning",
    room: "Room 208",
    reportedBy: "Turnover for next guest",
    time: "35m ago",
    status: "pending",
    actionLabel: "Assign",
    icon: <Broom className="size-4" />,
  },
];

export function DashboardAttention() {
  return (
    <AttentionNeeded
      items={attentionItems}
      onAction={(item) => {
        console.log("Action:", item.id, item.actionLabel);
      }}
      onViewAll={() => {
        console.log("View all maintenance tickets");
      }}
    />
  );
}
