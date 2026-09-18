import { Search } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getInitials } from "@/lib/getInitials";
import type { Customer } from "@/types/customer.types";

interface CustomerSearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  customers: Customer[];
  selectedCustomer: Customer | null;
  onCustomerSelect: (customer: Customer) => void;
  trigger: ReactNode;
}

export function CustomerSearchSheet({
  open,
  onOpenChange,
  searchTerm,
  onSearchTermChange,
  customers,
  selectedCustomer,
  onCustomerSelect,
  trigger,
}: CustomerSearchSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger ? <SheetTrigger asChild>{trigger}</SheetTrigger> : null}

      <SheetContent side="right" className="overflow-y-auto sm:max-w-lg">
        <SheetHeader className="mb-5">
          <SheetTitle className="font-['DM_Sans'] text-xl font-bold">
            New Booking
          </SheetTitle>
          <SheetDescription className="font-['DM_Sans'] text-sm text-muted-foreground">
            Search an existing guest or create a new reservation.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
              placeholder="Search customer by name, phone or customer ID"
              className="border-input bg-background pl-9 text-foreground"
            />
          </div>

          <div className="space-y-2">
            {customers.length === 0 ? (
              <div className="rounded-xl border border-dashed p-4 text-center text-sm text-muted-foreground">
                No customers match your search.
              </div>
            ) : (
              customers.map((customer) => {
                const isSelected = selectedCustomer?.id === customer.id;

                return (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => onCustomerSelect(customer)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="font-medium text-foreground">
                          {customer.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {customer.phone}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Customer ID: {customer.customerId}
                        </p>
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant={isSelected ? "secondary" : "default"}
                      className="shrink-0"
                    >
                      {isSelected ? "Selected" : "Select"}
                    </Button>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <SheetFooter className="mt-6 flex flex-row justify-end gap-2">
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
