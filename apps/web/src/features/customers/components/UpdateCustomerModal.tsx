import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Customer } from "@/types/customer.types";

import { useUpdateCustomerFacade } from "../hooks/useUpdateCustomer";

type UpdateCustomerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer;
};

export function UpdateCustomerModal({
  customer,
  open,
  onOpenChange,
}: UpdateCustomerModalProps) {
  const { handleSubmit, submit, register, errors, isPending } =
    useUpdateCustomerFacade(customer.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Update customer
          </DialogTitle>
          <DialogDescription>
            Update the customer information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-6">
          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                type="text"
                required
                placeholder="Enter full name"
                aria-invalid={!!errors.fullName}
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
                autoComplete="name"
                {...register("fullName")}
                defaultValue={customer.fullName}
                disabled={isPending}
              />
            </div>

            {errors.fullName && (
              <span id="fullName-error" className="text-sm text-destructive">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                required
                placeholder="Enter phone number"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                autoComplete="tel"
                {...register("phone")}
                defaultValue={customer.phone}
                disabled={isPending}
              />
            </div>

            {errors.phone && (
              <span id="phone-error" className="text-sm text-destructive">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="Enter email address"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                autoComplete="email"
                {...register("email")}
                defaultValue={customer.email}
                disabled={isPending}
              />
            </div>

            {errors.email && (
              <span id="email-error" className="text-sm text-destructive">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"

                required
                placeholder="Enter address"
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? "address-error" : undefined}
                autoComplete="street-address"
                {...register("address")}
                defaultValue={customer.customerProfile?.address}
                disabled={isPending}
              />
            </div>

            {errors.address && (
              <span id="address-error" className="text-sm text-destructive">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="idProofNumber">ID proof number</Label>
              <Input
                id="idProofNumber"
                type="text"
                required
                placeholder="Enter ID proof number"
                aria-invalid={!!errors.idProofNumber}
                aria-describedby={
                  errors.idProofNumber ? "idProofNumber-error" : undefined
                }
                {...register("idProofNumber")}
                defaultValue={customer.customerProfile?.idProofNumber}
                disabled={isPending}
              />
            </div>

            {errors.idProofNumber && (
              <span
                id="idProofNumber-error"
                className="text-sm text-destructive"
              >
                {errors.idProofNumber.message}
              </span>
            )}
          </div>

          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
