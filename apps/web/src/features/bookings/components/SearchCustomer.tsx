import { Check, Mail, Phone, Search, UserRound } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { dummyCustomerList } from "../booking.mock";
import type { CustomerItem } from "../booking.types";

interface SearchCustomerProps {
  value?: CustomerItem | null;
  onChange?: (customer: CustomerItem) => void;
}

export function SearchCustomer({
  value = null,
  onChange,
}: SearchCustomerProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customer..."
          className="pl-9"
        />
      </div>

      {/* Selected Customer */}
      {value && (
        <Card className="border-primary/30 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <UserRound className="h-5 w-5 text-primary" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-semibold">{value.fullName}</h3>
                <Check className="h-4 w-4 text-primary" />
              </div>

              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate">{value.email}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5" />
                  <span>{value.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Customer List */}
      <Card className="p-1">
        <ScrollArea className="h-72 sm:h-80">
          <div className="space-y-1 p-1">
            {dummyCustomerList.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No customers available.
              </div>
            ) : (
              dummyCustomerList.map((customer) => {
                const selected = value?.id === customer.id;

                return (
                  <Button
                    key={customer.id}
                    type="button"
                    variant={selected ? "secondary" : "ghost"}
                    onClick={() => onChange?.(customer)}
                    className="h-auto w-full justify-start p-3"
                  >
                    <div className="flex w-full items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          selected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {selected ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <UserRound className="h-5 w-5" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1 text-left">
                        <div className="truncate font-medium">
                          {customer.fullName}
                        </div>

                        <div className="truncate text-sm text-muted-foreground">
                          {customer.email}
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {customer.phone}
                        </div>
                      </div>

                      {selected && (
                        <div className="text-xs font-medium text-primary">
                          Selected
                        </div>
                      )}
                    </div>
                  </Button>
                );
              })
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
