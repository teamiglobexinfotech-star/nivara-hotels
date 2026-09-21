import { Plus } from "lucide-react";

import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { CustomerKpi } from "@/features/customers/components/CustomerKpi";
import { CustomerTableSection } from "@/features/customers/components/CustomerTableSection";
import { NewCustomerModal } from "@/features/customers/components/NewCustomerModal";

export function CustomersPage() {
  return (
    <>
      <SectionHeader
        title="Customers"
        description="Manage customers"
        rightContent={
          <>
            <NewCustomerModal>
              <Button
                id="btn-add-customer"
                variant="default"
                size="sm"
                className="h-9 gap-1.5 rounded-full bg-foreground px-4 text-xs font-medium text-background hover:bg-foreground/90"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Customer</span>
              </Button>
            </NewCustomerModal>
          </>
        }
      />
      <CustomerKpi />
      <CustomerTableSection />
    </>
  );
}
