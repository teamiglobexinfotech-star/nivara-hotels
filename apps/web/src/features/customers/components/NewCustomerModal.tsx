import type { ReactNode } from "react";

import { TextareaField } from "@/components/shared/TextareaField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCreateCustomerFacade } from "../hooks/useCreateCustomer";

export function NewCustomerModal({ children }: { children: ReactNode }) {
  const { handleSubmit, submit, register, errors, isPending } =
    useCreateCustomerFacade();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            New Customer
          </DialogTitle>
          <DialogDescription>
            Enter the customer details below to create a new customer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div className="max-h-[60vh] space-y-4 overflow-y-scroll">
            <div className="space-y-1">
              <div className="space-y-0.5">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  type="text"

                  placeholder="Enter full name"
                  autoComplete="name"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={
                    errors.fullName ? "fullName-error" : undefined
                  }
                  {...register("fullName")}
                  disabled={isPending}
                />
              </div>

              {errors?.fullName && (
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

                  placeholder="Enter phone number"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  {...register("phone")}
                  disabled={isPending}
                />
              </div>

              {errors?.phone && (
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

                  placeholder="Enter email address"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                  disabled={isPending}
                />
              </div>

              {errors?.email && (
                <span id="email-error" className="text-sm text-destructive">
                  {errors.email.message}
                </span>
              )}
            </div>

            <TextareaField
              label="Address"
              placeholder="e.g. 123 Main Street, Anytown, USA"
              {...register("address")}
              disabled={isPending}
              error={errors.address?.message}
            />

            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="idProofNumber">ID proof number</Label>
                <Input
                  id="idProofNumber"
                  type="text"

                  placeholder="Enter ID proof number"
                  aria-invalid={!!errors.idProofNumber}
                  aria-describedby={
                    errors.idProofNumber ? "idProofNumber-error" : undefined
                  }
                  {...register("idProofNumber")}
                  disabled={isPending}
                />
              </div>

              {errors?.idProofNumber && (
                <span
                  id="idProofNumber-error"
                  className="text-sm text-destructive"
                >
                  {errors.idProofNumber.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <DialogClose>
              <Button type="button" variant="outline" disabled={isPending}>
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
