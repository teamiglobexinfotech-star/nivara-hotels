import { type ReactNode,useState } from "react";

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

import { useCreateStaffFacade } from "../hooks/useCreateStaff";

export function NewStaffSheet({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, submit, register, errors, isPending } =
    useCreateStaffFacade();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="side-sheet overflow-y-auto sm:max-w-xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-['DM_Sans'] text-xl font-bold">
            Staff Information Sheet
          </SheetTitle>
          <SheetDescription className="font-['DM_Sans'] text-sm text-muted-foreground">
            Fill in the details below to register or update staff credentials.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-4 pb-10">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="font-['DM_Sans'] text-sm font-medium text-foreground">
              Full Name <span className="text-primary">*</span>
            </label>
            <Input type="text" placeholder="John Doe" />
            {errors.fullName && (
              <span className="font-['DM_Sans'] text-xs text-red-400">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="font-['DM_Sans'] text-sm font-medium text-foreground">
              Email <span className="text-primary">*</span>
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="your@email.com"
            />
            {errors.email && (
              <span className="font-['DM_Sans'] text-xs text-red-400">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <label className="font-['DM_Sans'] text-sm font-medium text-foreground">
              Phone Number <span className="text-primary">*</span>
            </label>
            <Input
              {...register("phone")}
              type="tel"
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && (
              <span className="font-['DM_Sans'] text-xs text-red-400">
                {errors.phone.message}
              </span>
            )}
          </div>

          {/* Father's Name */}
          <div className="flex flex-col gap-2">
            <label className="font-['DM_Sans'] text-sm font-medium text-foreground">
              Father's Name <span className="text-primary">*</span>
            </label>
            <Input
              {...register("fatherName")}

              type="text"
              placeholder="Father's Full Name"
            />
            {errors.fatherName && (
              <span className="font-['DM_Sans'] text-xs text-red-400">
                {errors.fatherName.message}
              </span>
            )}
          </div>

          {/* Mother's Name */}
          <div className="flex flex-col gap-2">
            <label className="font-['DM_Sans'] text-sm font-medium text-foreground">
              Mother's Name <span className="text-primary">*</span>
            </label>
            <Input
              {...register("motherName")}

              type="text"
              placeholder="Mother's Full Name"
            />
            {errors.motherName && (
              <span className="font-['DM_Sans'] text-xs text-red-400">
                {errors.motherName.message}
              </span>
            )}
          </div>

          {/* ID Proof Number */}
          <div className="flex flex-col gap-2">
            <label className="font-['DM_Sans'] text-sm font-medium text-foreground">
              ID Proof Number <span className="text-primary">*</span>
            </label>
            <Input
              {...register("idProofNumber")}

              type="text"
              placeholder="Aadhaar / PAN / Passport Number"
            />
            {errors.idProofNumber && (
              <span className="font-['DM_Sans'] text-xs text-red-400">
                {errors.idProofNumber.message}
              </span>
            )}
          </div>

          {/* Qualification */}
          <div className="flex flex-col gap-2">
            <label className="font-['DM_Sans'] text-sm font-medium text-foreground">
              Qualification <span className="text-primary">*</span>
            </label>
            <Input
              {...register("qualification")}

              type="text"
              placeholder="e.g., B.Tech, M.Sc, MBA"
            />
            {errors.qualification && (
              <span className="font-['DM_Sans'] text-xs text-red-400">
                {errors.qualification.message}
              </span>
            )}
          </div>

          {/* Experience */}
          <div className="flex flex-col gap-2">
            <label className="font-['DM_Sans'] text-sm font-medium text-foreground">
              Experience <span className="text-primary">*</span>
            </label>
            <Input
              {...register("experience")}

              type="text"
              placeholder="e.g., 3 Years"
            />
            {errors.experience && (
              <span className="font-['DM_Sans'] text-xs text-red-400">
                {errors.experience.message}
              </span>
            )}
          </div>

          {/* Category - Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="font-['DM_Sans'] text-sm font-medium text-foreground">
              Category <span className="text-primary">*</span>
            </label>
            <select {...register("category")}>
              <option value="">Select category...</option>
              <option value="teaching">Teaching Staff</option>
              <option value="non-teaching">Non-Teaching Staff</option>
              <option value="administrative">Administrative</option>
              <option value="support">Support / Maintenance</option>
            </select>
            {errors.category && (
              <span className="font-['DM_Sans'] text-xs text-red-400">
                {errors.category.message}
              </span>
            )}
          </div>

          {/* Emergency Contact */}
          <div className="flex flex-col gap-2">
            <label className="font-['DM_Sans'] text-sm font-medium text-foreground">
              Emergency Contact <span className="text-primary">*</span>
            </label>
            <Input
              {...register("emergencyContact")}

              type="tel"
              placeholder="+1 (555) 123-4567"
            />
            {errors.emergencyContact && (
              <span className="font-['DM_Sans'] text-xs text-red-400">
                {errors.emergencyContact.message}
              </span>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label className="font-['DM_Sans'] text-sm font-medium text-foreground">
              Address <span className="text-primary">*</span>
            </label>
            <textarea
              {...register("address")}

              rows={3}
              placeholder="Enter full residential address"
              className={`flex w-full rounded-md border bg-background px-3 py-2 font-['DM_Sans'] text-sm text-foreground transition-colors focus:ring-2 focus:ring-primary/20 focus:outline-none ${
                errors.address ? "border-red-400" : "border-border"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            />
            {errors.address && (
              <span className="font-['DM_Sans'] text-xs text-red-400">
                {errors.address.message}
              </span>
            )}
          </div>

          {/* Footer Actions */}
          <SheetFooter className="mt-6 flex flex-row justify-end gap-2 pt-2">
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Staff"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
