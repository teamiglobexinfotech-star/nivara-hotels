import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { roomTypeKeys, roomTypeMutationKeys } from "../roomType.keys";
import { roomTypeService } from "../roomType.service";
import {
  type CreateRoomType,
  createRoomTypeSchema,
} from "../schema/createRoomType.schema";

function useCreateRoomType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: roomTypeMutationKeys.create,
    mutationFn: roomTypeService.create,

    onSuccess: (res) => {
      toast.success(res?.message || "Room type created successfully.");

      queryClient.invalidateQueries({
        queryKey: roomTypeKeys.list(),
      });
    },

    onError: notifyError,
  });
}

export function useCreateRoomTypeFacade() {
  const { mutate, isPending, isSuccess } = useCreateRoomType();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(createRoomTypeSchema),
    defaultValues: {
      name: "",
      description: "",
      capacity: 1,
      basePrice: 0,
      isActive: true,
    },
  });

  return {
    submit: (data: CreateRoomType) => mutate(data),
    isPending,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
    reset,
    setValue,
  };
}
