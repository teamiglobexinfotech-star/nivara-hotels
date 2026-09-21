import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { roomTypeKeys, roomTypeMutationKeys } from "../roomType.keys";
import { roomTypeService } from "../roomType.service";
import {
  type UpdateRoomType,
  updateRoomTypeSchema,
} from "../schema/updateRoomType.schema";

function useUpdateRoomType(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: roomTypeMutationKeys.update,
    mutationFn: (data: UpdateRoomType) => roomTypeService.update(id, data),

    onSuccess: (res) => {
      toast.success(res?.message || "Room type updated successfully.");

      queryClient.invalidateQueries({
        queryKey: roomTypeKeys.list(),
      });
    },

    onError: notifyError,
  });
}

export function useUpdateRoomTypeFacade(id: string) {
  const { mutate, isPending, isSuccess } = useUpdateRoomType(id);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm<UpdateRoomType>({
    resolver: zodResolver(updateRoomTypeSchema),
  });

  return {
    submit: (data: UpdateRoomType) => mutate(data),
    isPending,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
    reset,
  };
}
