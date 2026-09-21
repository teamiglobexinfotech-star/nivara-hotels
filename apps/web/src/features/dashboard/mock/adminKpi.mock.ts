import { BedDouble, CalendarCheck, Wallet, Wrench } from "lucide-react";

import type { KpiItem } from "@/types/shared.types";

export const adminKpi: KpiItem[] = [
  {
    id: "total-bookings",
    iconKey: CalendarCheck,
    title: "Total Bookings",
    value: 128,
    details: "All bookings",
  },
  {
    id: "revenue",
    iconKey: Wallet,
    title: "Revenue",
    value: "₹42500",
    details: "Paid revenue",
  },
  {
    id: "occupancy",
    iconKey: BedDouble,
    title: "Occupancy",
    value: "78%",
    details: "Current room occupancy",
  },
  {
    id: "pending-maintenance",
    iconKey: Wrench,
    title: "Pending Maintenance",
    value: 7,
    details: "Open maintenance reports",
  },
];
