import { Controller } from "react-hook-form";

import { ErrorModal } from "@/components/shared/ErrorModal";
import { FullScreenLoader } from "@/components/shared/FullScreenLoader";
import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { TextareaField } from "@/components/shared/TextareaField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { STAFF_CATEGORY_OPTIONS } from "@/constants";

import { useStaff } from "../hooks/useStaff";
import { useUpdateStaffFacade } from "../hooks/useUpdateStaff";
import type { StaffDetails } from "../staff.types";

type UpdateStaffSheetProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
};

export function UpdateStaffSheet({
  isOpen,
  onOpenChange,
  id,
}: UpdateStaffSheetProps) {
  const { staffDetails, isLoading, isError, refetch } = useStaff(id);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (isError || !staffDetails) {
    return (
      <ErrorModal
        open={!isError}
        onOpenChange={onOpenChange}
        onRefetch={refetch}
      />
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="side-sheet overflow-y-auto sm:max-w-xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-['DM_Sans'] text-xl font-bold">
            Update Staff Member
          </SheetTitle>
          <SheetDescription className="font-['DM_Sans'] text-sm text-muted-foreground">
            Update the staff member's personal and contact details.
          </SheetDescription>
          <StaffSheet staffDetails={staffDetails} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

function StaffSheet({ staffDetails }: { staffDetails: StaffDetails }) {
  const { handleSubmit, register, control, errors, isPending, submit } =
    useUpdateStaffFacade(staffDetails.id);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-4 overflow-y-scroll"
    >
      <Separator />
      <div className="h-[70vh] space-y-4 overflow-y-scroll">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Full Name"
            placeholder="e.g. Rahul Sharma"
            {...register("fullName", { value: staffDetails?.fullName })}
            disabled={isPending}
            error={errors.fullName?.message}
          />

          <InputField
            label="Email Address"
            placeholder="e.g. rahul.sharma@example.com"
            {...register("email", { value: staffDetails?.email })}
            disabled={isPending}
            error={errors.email?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectField
            name="category"
            label="Staff Category"
            placeholder="Select a staff category"
            control={control}
            options={STAFF_CATEGORY_OPTIONS}
            error={errors.category?.message}
            disabled={isPending}
          />

          <InputField
            label="Phone Number"
            placeholder="e.g. 9876543210"
            {...register("phone", { value: staffDetails?.phone })}
            disabled={isPending}
            error={errors.phone?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Father's Name"
            placeholder="e.g. Ramesh Sharma"
            {...register("fatherName", {
              value: staffDetails?.staff?.fatherName,
            })}
            disabled={isPending}
            error={errors.fatherName?.message}
          />

          <InputField
            label="Mother's Name"
            placeholder="e.g. Sunita Sharma"
            {...register("motherName", {
              value: staffDetails?.staff?.motherName,
            })}
            disabled={isPending}
            error={errors.motherName?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="ID Proof Number"
            placeholder="e.g. ABCD1234567"
            {...register("idProofNumber", {
              value: staffDetails?.staff?.idProofNumber,
            })}
            disabled={isPending}
            error={errors.idProofNumber?.message}
          />

          <InputField
            label="Qualification"
            placeholder="e.g. B.Com"
            {...register("qualification", {
              value: staffDetails?.staff?.qualification,
            })}
            disabled={isPending}
            error={errors.qualification?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Experience"
            placeholder="e.g. 3 years"
            {...register("experience", {
              value: staffDetails?.staff?.experience,
            })}
            disabled={isPending}
            error={errors.experience?.message}
          />

          <InputField
            label="Emergency Contact"
            placeholder="e.g. 9123456789"
            {...register("emergencyContact", {
              value: staffDetails?.staff?.emergencyContact,
            })}
            disabled={isPending}
            error={errors.emergencyContact?.message}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <Label htmlFor="isActive">Active</Label>
          </div>

          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <Switch
                id="isActive"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isPending}
              />
            )}
          />
        </div>

        <TextareaField
          label="Address"
          placeholder="e.g. 221B MG Road, Lucknow, Uttar Pradesh"
          {...register("address", { value: staffDetails?.staff?.address })}
          disabled={isPending}
          error={errors.address?.message}
        />
      </div>
      <Separator />
      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating Staff..." : "Update Staff Member"}
        </Button>
      </div>
    </form>
  );
}
