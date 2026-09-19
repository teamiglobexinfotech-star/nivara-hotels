import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCustomerById } from "../hooks/useCustomerById";
import type { CustomerDetailsResponse } from "@/types/customer.types";

type ViewCustomerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
};

export function ViewCustomerModal({
  open,
  onOpenChange,
  id,
}: ViewCustomerModalProps) {
  const { data, isLoading, isError, refetch } = useCustomerById(id);
  const customer = data?.data as CustomerDetailsResponse;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-160">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-6">
            <div className="space-y-1">
              <DialogTitle className="text-lg font-semibold tracking-tight">
                Rahul Sharma
              </DialogTitle>
              <DialogDescription className="flex flex-wrap gap-x-4 gap-y-1">
                <span>📞 9876543210</span>
                <span>✉ r@x.com</span>
              </DialogDescription>
            </div>

            <Button
              type="button"
              variant="outline"
              //   onClick={onEdit}
              //   disabled={!onEdit}
            >
              Edit
            </Button>
          </div>
        </DialogHeader>

        <Separator />

        <Tabs defaultValue="profile" className="w-full flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Address
                </p>
                <p className="text-sm">123, MG Road, Mumbai</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">ID</p>
                <p className="text-sm">Aadhaar 1234-5678-9012</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Created
              </p>
              <p className="text-sm">10 Jan 2026 by Raj</p>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium">ID Proof</span>
                <Button type="button" variant="outline" size="sm">
                  View Image
                </Button>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium">Signature</span>
                <Button type="button" variant="outline" size="sm">
                  View Image
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
              No booking details available.
            </div>
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
              No payment details available.
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
