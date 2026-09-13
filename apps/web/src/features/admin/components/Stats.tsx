import { KpisSection } from "@/components/common/KpiSection";
import {
  BedDouble,
  CalendarCheck,
  CircleDollarSign,
  Users,
} from "lucide-react";

const dashboardKpis = [
  {
    icon: BedDouble,
    value: "78.4%",
    label: "Occupancy Rate",
    description: "188 of 240 rooms occupied",
    variant: "primary" as const,
  },
  {
    icon: CalendarCheck,
    value: "42",
    label: "Today's Bookings",
    description: "35 confirmed · 5 pending",
    variant: "secondary" as const,
  },
  {
    icon: Users,
    value: "186",
    label: "Total Guests",
    description: "142 checked in · 28 arriving",
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

export function Stats() {
  return <KpisSection data={dashboardKpis} />;
}
