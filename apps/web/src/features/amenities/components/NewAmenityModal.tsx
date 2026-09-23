import type { ReactNode } from "react";

import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
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

import { amenitiesList } from "../amenity.constants";
import { useCreateAmenityFacade } from "../hooks/useCreateAmenity";

export function NewAmenityModal({ children }: { children: ReactNode }) {
  const { handleSubmit, submit, register, errors, isPending, control } =
    useCreateAmenityFacade();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Add New Amenity
          </DialogTitle>
          <DialogDescription>
            Add a new room amenity with its name, icon, and availability status.
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
            {...register("name")}
          />

          <SelectField
            name="iconKey"
            label="Select Amenity Icon"
            control={control}
            options={amenitiesList}
            error={errors.iconKey?.message}
            disabled={isPending}
          />

          <TextareaField
            label="Description"
            placeholder="Briefly describe this amenity..."
            error={errors.description?.message}
            disabled={isPending}
            {...register("description")}
          />

          <DialogFooter className="flex gap-2 sm:flex-row sm:justify-end">
            <DialogClose>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
