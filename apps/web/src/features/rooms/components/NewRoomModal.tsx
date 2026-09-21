import type { ReactNode } from "react";
import { Controller } from "react-hook-form";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { RoomType } from "@/types/room.types";

import { useCreateRoomFacade } from "../hooks/useCreateRoom";
import { useRoomType } from "../hooks/useRoomType";

export function NewRoomModal({ children }: { children: ReactNode }) {
  const { handleSubmit, submit, register, errors, isPending, control } =
    useCreateRoomFacade();
  const { items } = useRoomType();
  console.log(errors);
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight">
            New Room
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(submit)}
          className="space-y-4 overflow-y-scroll"
        >
          <div className="space-y-1">
            <div className="space-y-0.5">
              <Label htmlFor="roomNumber">Room Number</Label>
              <Input
                id="roomNumber"
                type="number"
                placeholder="Room Number"
                autoComplete="roomNumber"
                aria-invalid={!!errors.roomNumber}
                aria-describedby={
                  errors.roomNumber ? "roomNumber-error" : undefined
                }
                {...register("roomNumber")}
                disabled={isPending}
              />
            </div>

            {errors?.roomNumber && (
              <span id="roomNumber-error" className="text-sm text-destructive">
                {errors.roomNumber.message}
              </span>
            )}
          </div>

          <div className="grid w-full grid-cols-2 gap-4">
            <div className="w-full space-y-1">
              <div className="space-y-0.5">
                <Label htmlFor="roomTypeId">Select Room Type</Label>
              </div>
              <Controller
                name="roomTypeId"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>

                    <SelectContent>
                      {items?.map((opt: RoomType) => (
                        <SelectItem key={opt.id} value={opt.id}>
                          {opt.name.charAt(0).toUpperCase() +
                            opt.name.slice(1).toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.roomTypeId && (
                <span
                  id="roomTypeId-error"
                  className="text-sm text-destructive"
                >
                  {errors.roomTypeId.message}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <div className="space-y-0.5">
                <Label htmlFor="floor">Room Floor</Label>
                <Input
                  id="floor"
                  type="number"
                  placeholder="Room Number"
                  autoComplete="floor"
                  aria-invalid={!!errors.floor}
                  aria-describedby={errors.floor ? "floor-error" : undefined}
                  {...register("floor")}
                  disabled={isPending}
                />
              </div>

              {errors?.floor && (
                <span id="floor-error" className="text-sm text-destructive">
                  {errors.floor.message}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"

                placeholder="Enter description"

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

          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <DialogClose>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Create Room"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
