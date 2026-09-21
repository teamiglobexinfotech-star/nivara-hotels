import { InputField } from "@/components/shared/InputField";
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
} from "@/components/ui/dialog";

import type { Amenity } from "../amenity.types";
import { useUpdateAmenityFacade } from "../hooks/useUpdateAmenity";

type UpdateAmenityModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amenity: Amenity;
};

export function UpdateAmenityModal({
  amenity,
  open,
  onOpenChange,
}: UpdateAmenityModalProps) {
  const { handleSubmit, submit, register, errors, isPending } =
    useUpdateAmenityFacade(amenity.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Update Amenity
          </DialogTitle>
          <DialogDescription>
            Enter the amenity details below to update amenity.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4 overflow-y-scroll"
        >
          <InputField
            label="Amenity Name"
            placeholder="e.g. Free Wi-Fi"
            error={errors.name?.message}
            disabled={isPending}
            {...register("name", { value: amenity.name })}
          />
          <InputField
            label="Icon"
            placeholder="e.g. Wifi, Car, Coffee"
            error={errors.iconKey?.message}
            disabled={isPending}
            {...register("iconKey", { value: amenity.iconKey || "" })}
          />
          <TextareaField
            label="Icon"
            placeholder="Briefly describe this amenity..."
            error={errors.description?.message}
            disabled={isPending}
            {...register("description", { value: amenity.description || "" })}
          />
          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <DialogClose>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
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
