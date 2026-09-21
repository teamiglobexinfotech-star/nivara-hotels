import type { ReactNode } from "react";
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
import { Button } from "@/components/ui/button";
import { useCreateRoomTypeFacade } from "../hooks/useCreateRoomType";
import { Textarea } from "@/components/ui/textarea";

export function NewRoomTypeModal({ children }: { children: ReactNode }) {
  const { handleSubmit, submit, register, errors, isPending } =
    useCreateRoomTypeFacade();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            New Room Type
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4 overflow-y-scroll"
        >
          <div className="space-y-1">
            <div className="space-y-0.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                {...register("name")}
                disabled={isPending}
              />
            </div>

            {errors?.name && (
              <span id="name-error" className="text-sm text-destructive">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"

                placeholder="Enter description number"
                autoComplete="tel"
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
                {...register("description")}
                disabled={isPending}
                className="h-20 resize-none"
              />
            </div>

            {errors?.description && (
              <span id="description-error" className="text-sm text-destructive">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Enter capacity number"
                autoComplete="capacity"
                aria-invalid={!!errors.capacity}
                aria-describedby={
                  errors.capacity ? "capacity-error" : undefined
                }
                {...register("capacity")}
                disabled={isPending}
              />
            </div>

            {errors?.capacity && (
              <span id="capacity-error" className="text-sm text-destructive">
                {errors.capacity.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="basePrice">Base Price</Label>
              <Input
                id="basePrice"
                type="number"
                placeholder="Enter basePrice address"
                autoComplete="basePrice"
                aria-invalid={!!errors.basePrice}
                aria-describedby={
                  errors.basePrice ? "basePrice-error" : undefined
                }
                {...register("basePrice")}
                disabled={isPending}
              />
            </div>

            {errors?.basePrice && (
              <span id="basePrice-error" className="text-sm text-destructive">
                {errors.basePrice.message}
              </span>
            )}
          </div>

          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <DialogClose>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Create Room Type"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
