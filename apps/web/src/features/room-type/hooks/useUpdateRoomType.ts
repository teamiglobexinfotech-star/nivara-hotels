import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { notifyError } from "@/lib/notification";
import { roomTypeService } from "../room-type.service";
import {
  UpdateRoomTypeSchema,
  type UpdateRoomType,
  type UpdateRoomTypeForm,
} from "../schema/room-type.schema";

import { roomTypeKeys, roomTypeMutationKeys } from "../room-type.keys";

function useUpdateRoomType(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: roomTypeMutationKeys.create,
    mutationFn: (data: UpdateRoomType) => roomTypeService.update(id, data),
    onSuccess: (res) => {
      toast.success(res?.message || "Room type created successfully.");
      queryClient.invalidateQueries({
        queryKey: roomTypeKeys.all,
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
    getValues,
    formState: { errors },
    reset,
  } = useForm<UpdateRoomTypeForm, any, UpdateRoomType>({
    resolver: zodResolver(UpdateRoomTypeSchema),
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
