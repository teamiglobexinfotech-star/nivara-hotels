import { DataTable, type TableColumn } from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface TodayOperation {
  bookingId: string;
  guestName: string;
  room: string;
  activity: "Check In" | "Check Out";
  time: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

const getInitials = (name: string) => {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const getStatusVariant = (
  status: TodayOperation["status"]
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Confirmed":
      return "default";
    case "Completed":
      return "secondary";
    case "Cancelled":
      return "destructive";
    case "Pending":
    default:
      return "outline";
  }
};

const todayOperations: TodayOperation[] = [
  {
    bookingId: "BK-1001",
    guestName: "Rahul Sharma",
    room: "101",
    activity: "Check In",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    bookingId: "BK-1002",
    guestName: "Priya Singh",
    room: "205",
    activity: "Check Out",
    time: "11:30 AM",
    status: "Completed",
  },
  {
    bookingId: "BK-1003",
    guestName: "Amit Verma",
    room: "302",
    activity: "Check In",
    time: "02:00 PM",
    status: "Pending",
  },
];

const bookingColumns: TableColumn<TodayOperation>[] = [
  {
    key: "bookingId",
    header: "Booking ID",

    render: (value) => (
      <span className="font-mono text-sm font-medium text-foreground">
        #{String(value)}
      </span>
    ),
  },

  {
    key: "guestName",
    header: "Guest Name",

    render: (_, booking) => (
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground">
          {getInitials(booking.guestName)}
        </div>

        <span className="text-sm font-medium whitespace-nowrap text-foreground">
          {booking.guestName}
        </span>
      </div>
    ),
  },

  {
    key: "room",
    header: "Room",

    render: (value) => (
      <span className="text-sm font-medium whitespace-nowrap text-foreground">
        {String(value)}
      </span>
    ),
  },

  {
    key: "activity",
    header: "Activity",

    render: (_, booking) => (
      <span className="text-sm font-medium whitespace-nowrap text-foreground">
        {booking.activity}
      </span>
    ),
  },

  {
    key: "time",
    header: "Time",

    render: (value) => (
      <span className="font-mono text-sm whitespace-nowrap text-muted-foreground">
        {String(value)}
      </span>
    ),
  },

  {
    key: "status",
    header: "Status",

    render: (value) => {
      const status = value as TodayOperation["status"];

      return <Badge variant={getStatusVariant(status)}>{status}</Badge>;
    },
  },

  {
    key: "action",
    header: "Action",
    headerClassName: "text-right",
    className: "text-right",

    render: (_, booking) => {
      let action: "Check In" | "Check Out" | "Review";

      if (booking.status === "Confirmed" && booking.activity === "Check In") {
        action = "Check In";
      } else if (
        booking.status === "Confirmed" &&
        booking.activity === "Check Out"
      ) {
        action = "Check Out";
      } else if (
        booking.status === "Completed" ||
        booking.status === "Cancelled"
      ) {
        action = "Review";
      } else {
        action = "Review";
      }

      return (
        <Button
          type="button"
          size="sm"
          variant={action === "Review" ? "outline" : "default"}
          onClick={() => {
            console.log(`${action}:`, booking.bookingId);
          }}
        >
          {action}
        </Button>
      );
    },
  },
];

export function DashboardTodayOperations() {
  return (
    <DataTable
      title="Today's Operations"
      description="Live guest arrivals, departures, and operational status"
      data={todayOperations}
      columns={bookingColumns}
      getRowKey={(booking) => booking.bookingId}
      onViewAll={() => {
        console.log("View All");
      }}
    />
  );
}
