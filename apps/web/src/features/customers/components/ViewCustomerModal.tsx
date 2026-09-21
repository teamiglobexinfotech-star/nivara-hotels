import { useState } from "react";

import { ErrorModal } from "@/components/shared/ErrorModal";
import { FullScreenLoader } from "@/components/shared/FullScreenLoader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/formatDate";
import type { CustomerDetails } from "@/types/customer.types";

import { useCustomerById } from "../hooks/useCustomerById";

import { UpdateCustomerModal } from "./UpdateCustomerModal";

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
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const customer = data?.data as CustomerDetails;

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError) {
    return (
      <ErrorModal
        open={!isError}
        onOpenChange={onOpenChange}
        onRefetch={refetch}
      />
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-160">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4 pr-6">
              <div className="space-y-1">
                <DialogTitle className="text-lg font-semibold tracking-tight">
                  {customer?.fullName}
                </DialogTitle>
                <DialogDescription className="flex flex-wrap gap-x-4 gap-y-1">
                  <span>📞 {customer?.phone}</span>
                  <span>✉ {customer?.email}</span>
                </DialogDescription>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUpdateModal(true)}
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
                  <p className="text-sm">
                    {customer?.customerProfile?.address}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Id Proof Number
                  </p>
                  <p className="text-sm">
                    {customer?.customerProfile?.idProofNumber}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Created
                </p>
                <p className="text-sm">{formatDate(customer?.createdAt!)}</p>
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

      <UpdateCustomerModal
        open={isUpdateModal}
        onOpenChange={setIsUpdateModal}
        customer={customer}
      />
    </>
  );
}
