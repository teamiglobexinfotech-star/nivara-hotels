import { DataTable, type TableColumn } from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bookings } from "@/mock/bookings";
import type { Booking } from "@/types/booking.types";

const bookingColumns: TableColumn<Booking>[] = [
  {
    key: "id",
    header: "Booking ID",

    render: (value) => (
      <span className="font-mono text-sm font-medium text-foreground">
        #{String(value)}
      </span>
    ),
  },

  {
    key: "guest",
    header: "Guest Name",

    render: (_, booking) => (
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground">
          {booking.guest.initials}
        </div>

        <span className="text-sm font-medium whitespace-nowrap text-foreground">
          {booking.guest.name}
        </span>
      </div>
    ),
  },

  {
    key: "room",
    header: "Room",

    render: (_, booking) => (
      <div className="flex items-center gap-1.5 whitespace-nowrap">
        <span className="font-medium text-foreground">
          #{booking.room.number}
        </span>

        <span className="text-xs text-muted-foreground">
          ({booking.room.type})
        </span>
      </div>
    ),
  },

  {
    key: "dates",
    header: "Check-in / Dates",

    render: (_, booking) => (
      <span className="font-mono text-sm whitespace-nowrap text-muted-foreground">
        {booking.dates.checkIn}–{booking.dates.checkOut.replace("Sep ", "")}
      </span>
    ),
  },

  {
    key: "status",
    header: "Status",

    render: (value) => {
      const status = String(value);

      const labels: Record<string, string> = {
        confirmed: "Confirmed",
        "checked-in": "Checked-in",
        pending: "Pending",
        cancelled: "Cancelled",
      };

      return <Badge variant="secondary">{labels[status] ?? status}</Badge>;
    },
  },

  {
    key: "amount",
    header: "Amount",

    render: (_, booking) => (
      <span className="font-mono text-sm font-medium whitespace-nowrap text-foreground">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: booking.amount.currency,
          maximumFractionDigits: 0,
        }).format(booking.amount.value)}
      </span>
    ),
  },

  {
    key: "action",
    header: "Action",
    headerClassName: "text-right",

    className: "text-right",

    render: (_, booking) => {
      const action =
        booking.status === "confirmed"
          ? "Check In"
          : booking.status === "checked-in"
            ? "Check Out"
            : "Review";

      return (
        <Button
          type="button"
          size="sm"
          variant={action === "Review" ? "outline" : "default"}
          onClick={() => {
            console.log(`${action}:`, booking.id);
          }}
        >
          {action}
        </Button>
      );
    },
  },
];

export function RecentBookings() {
  return (
    <DataTable
      title="Recent Bookings"
      description="Live reservation activity for today"
      data={bookings}
      columns={bookingColumns}
      getRowKey={(booking) => booking.id}
      viewAllLabel="View all bookings"
      onViewAll={() => {
        console.log("View all bookings");
      }}
    />
  );
}
