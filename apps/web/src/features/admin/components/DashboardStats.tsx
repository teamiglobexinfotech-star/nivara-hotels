import {
  BedDouble,
  CircleDollarSign,
  LogInIcon,
  LogOutIcon,
} from "lucide-react";
import { KpisSection } from "@/components/common/KpiSection";

const dashboardKpis = [
  {
    icon: BedDouble,
    value: "78.4%",
    label: "Occupancy",
    description: "188 of 240 rooms",
    variant: "primary" as const,
  },
  {
    icon: LogInIcon,
    value: "42",
    label: "Today's Check-ins",
    description: "35 confirmed · 5 pending",
    variant: "secondary" as const,
  },
  {
    icon: LogOutIcon,
    value: "186",
    label: "Today's Check-outs",
    description: "12 completed · 4 remaining",
    variant: "accent" as const,
  },
  {
    icon: CircleDollarSign,
    value: "₹2.85L",
    label: "Today's Revenue",
    description: "₹36.6K from hotel services",
    variant: "destructive" as const,
  },
];

export function DashboardStats() {
  return <KpisSection data={dashboardKpis} />;
}
