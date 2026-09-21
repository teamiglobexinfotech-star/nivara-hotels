import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import type { RecentBooking } from "@/features/bookings/booking.types";
import type { Column } from "@/types/shared.types";

import { recentBookings } from "../mock/recentBooking.mock";

const bookingColumns: Column<RecentBooking>[] = [
  {
    header: "Booking Code",
    key: "bookingCode",
  },
  {
    header: "Guest Name",
    key: "guestName",
    className: "flex items-center gap-x-2",
    render: (r) => (
      <div>
        <p>{r.guestName}</p>
      </div>
    ),
  },
  {
    header: "Room",
    key: "roomName",
  },
  {
    header: "Check In",
    key: "checkIn",
    render: (r) => <span>{r.checkIn.toLocaleDateString()}</span>,
  },
  {
    header: "Check Out",
    key: "checkOut",
    render: (r) => <span>{r.checkOut.toLocaleDateString()}</span>,
  },
  {
    header: "Amount",
    key: "amount",
    render: (r) => <span>₹{r.amount}</span>,
  },
  {
    header: "Status",
    key: "status",
    render: (r) => (
      <Badge variant={r.status === "ACTIVE" ? "secondary" : "destructive"}>
        {r.status[0] + r.status.slice(1).toLowerCase()}
      </Badge>
    ),
  },
];

export function RecentBookingsSection() {
  return (
    <DataTable
      response={{ items: recentBookings }}
      columns={bookingColumns}
      enablePagination={false}
    />
  );
}
