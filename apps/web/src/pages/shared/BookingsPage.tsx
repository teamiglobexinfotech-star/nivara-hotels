import { EllipsisVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { bookingKpiData, bookingsApiResponse } from "@/mock/booking.mock";
import { DataTable } from "@/components/shared/DataTable";
import type { Booking } from "@/types/booking.types";
import type { Column, FilterConfig } from "@/types/shared.types";
import { IconButton } from "@/components/shared/IconButton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/getInitials";
import { NewBookingSheet } from "@/features/booking/components/NewBookingSheet";

const bookingColumns: Column<Booking>[] = [
  {
    header: "Guest",
    key: "customer",
    className: "flex items-center gap-x-2",
    render: (booking) => (
      <>
        <Avatar>
          <AvatarFallback>
            {getInitials(booking.customer.fullName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span>{booking.customer.fullName}</span>
          <span className="text-xs text-muted-foreground">
            {booking.bookingReference}
          </span>
        </div>
      </>
    ),
  },
  {
    header: "Phone",
    key: "customer",
    render: (booking) => (
      <a href={`tel:${booking.customer.phone}`}>{booking.customer.phone}</a>
    ),
  },
  {
    header: "Booking ID",
    key: "bookingReference",
  },
  {
    header: "Status",
    key: "status",
    render: (booking) => (
      <Badge
        variant={
          booking.status === "CONFIRMED" || booking.status === "CHECKED_IN"
            ? "secondary"
            : booking.status === "PENDING"
              ? "outline"
              : "destructive"
        }
      >
        {booking.status.replace("_", " ").toLowerCase()}
      </Badge>
    ),
  },
  {
    header: "Guests",
    key: "totalGuests",
  },
  {
    header: "Total",
    key: "totalAmount",
    render: (booking) => `₹${booking.totalAmount.toLocaleString("en-IN")}`,
  },
  {
    header: "Action",
    key: "action",
    render: (booking) => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <IconButton size={"sm"} variant={"ghost"}>
            <EllipsisVertical />
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>Check-in</DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => console.log("Payment", booking.bookingReference)}
          >
            Payment
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => console.log("Check-out", booking.bookingReference)}
          >
            Check-out
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => console.log("Cancel", booking.bookingReference)}
          >
            Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export const bookingFilters: FilterConfig[] = [
  {
    key: "status",
    placeholder: "All statuses",
    options: [
      { label: "All", value: "all" },
      { label: "PENDING", value: "pending" },
      { label: "CONFIRMED", value: "confirmed" },
      { label: "CHECKED_IN", value: "checked_in" },
      { label: "CHECKED_OUT", value: "checked_out" },
      { label: "CANCELLED", value: "cancelled" },
      { label: "NO_SHOW", value: "no_show" },
    ],
  },
];

function KpiSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {bookingKpiData.map((item) => (
        <KpiCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export function BookingsPage() {
  return (
    <>
      <SectionHeader
        title="Bookings"
        description="Track reservations, check-ins, and guest arrivals across Nivara properties."
        rightContent={
          <>
            <NewBookingSheet>
              <Button
                id="btn-new-booking"
                variant="default"
                size="sm"
                className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Booking</span>
              </Button>
            </NewBookingSheet>
          </>
        }
      />
      <KpiSection />
      <DataTable
        response={bookingsApiResponse}
        columns={bookingColumns}
        searchKey="bookingReference"
        searchPlaceholder="Search bookings..."
        filters={bookingFilters}
        enablePagination={true}
        onPageChange={(page) => console.log("Fetch page:", page)}
        onSearchChange={(query) => console.log("Search query:", query)}
        onFilterChange={(filters) => console.log("Applied filters:", filters)}
      />
    </>
  );
}
