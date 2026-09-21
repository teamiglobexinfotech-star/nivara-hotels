import { Bed, CheckCircle2, Sparkles, UserCheck } from "lucide-react";

import type { KpiItem } from "@/types/shared.types";

export const roomKpisData: KpiItem[] = [
  {
    id: 1,
    iconKey: Bed,
    title: "Total Rooms",
    value: "84",
    details: "All registered rooms",
  },
  {
    id: 2,
    iconKey: CheckCircle2,
    title: "Available",
    value: "32",
    details: "Ready for new bookings",
  },
  {
    id: 3,
    iconKey: UserCheck,
    title: "Occupied",
    value: "38",
    details: "Currently occupied",
  },
  {
    id: 4,
    iconKey: Sparkles,
    title: "Housekeeping",
    value: "14",
    details: "Cleaning or service required",
  },
];
