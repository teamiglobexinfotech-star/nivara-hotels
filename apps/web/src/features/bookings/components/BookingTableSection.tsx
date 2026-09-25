import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

import { DataTable } from "@/components/shared/DataTable";
import { IconButton } from "@/components/shared/IconButton";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDebounce } from "@/hooks/useDebounce";
import type { Column } from "@/types/shared.types";

import { dummBookingList } from "../booking.mock";
import type { BookingItem } from "../booking.types";

const bookingColumns: Column<BookingItem>[] = [
  {
    header: "Booking",
    key: "bookingReference",
    className: "flex items-center gap-x-2 font-medium text-muted-foreground",
    render: (r) => <> #{r.bookingReference}</>,
  },
  {
    header: "Customer",
    key: "customer",
    render: (r) => (
      <div>
        <p className="font-medium">{r.customer.fullName}</p>
      </div>
    ),
  },
  {
    header: "Room",
    key: "room",
    render: (r) => (
      <div>
        <p className="font-medium">#{r.room.roomNumber}</p>
        <span className="text-sm text-muted-foreground">
          {r.room.name || "Unnamed Room"}
        </span>
      </div>
    ),
  },
  {
    header: "Check-in",
    key: "checkInDate",
    render: (r) => (
      <span>
        {r.checkInDate
          ? new Date(r.checkInDate).toLocaleDateString("en-IN")
          : "-"}
      </span>
    ),
  },
  {
    header: "Check-out",
    key: "checkOutDate",
    render: (r) => (
      <span>
        {r.checkOutDate
          ? new Date(r.checkOutDate).toLocaleDateString("en-IN")
          : "-"}
      </span>
    ),
  },
  {
    header: "Total Amount",
    key: "totalAmount",
    render: (r) => (
      <span className="font-medium">
        ₹{r.totalAmount.toLocaleString("en-IN")}
      </span>
    ),
  },
  {
    header: "Status",
    key: "status",
    render: (r) => (
      <Badge
        variant={
          r.status === "CONFIRMED"
            ? "secondary"
            : r.status === "CHECKED_IN"
              ? "default"
              : r.status === "CHECKED_OUT"
                ? "outline"
                : r.status === "CANCELLED" || r.status === "NO_SHOW"
                  ? "destructive"
                  : "secondary"
        }
      >
        {r.status.replace(/_/g, " ")}
      </Badge>
    ),
  },
  {
    header: "Action",
    key: "action",
    render: (b) => <ActionDropdownMenu booking={b} />,
  },
];

export function BookingTableSection() {
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const query = useDebounce(search, 400);

  return (
    <DataTable
      response={{ items: dummBookingList }}
      columns={bookingColumns}
      searchKey="k"
      enablePagination={true}
      onPageChange={(page) => setPage(page)}
      onSearchChange={(query) => setSearch(query)}
    />
  );
}

function ActionDropdownMenu({ booking }: { booking: BookingItem }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton size={"sm"} variant={"ghost"}>
            <EllipsisVertical />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
