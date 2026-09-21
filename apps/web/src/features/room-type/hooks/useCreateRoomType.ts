import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { notifyError } from "@/lib/notification";
import { roomKeys, roomMutationKeys } from "../room-type.keys";
import { roomTypeService } from "../room-type.service";
import {
  CreateRoomTypeSchema,
  type CreateRoomType,
  type CreateRoomTypeForm,
} from "../schema/room-type.schema";
import { useEffect } from "react";

function useCreateRoomType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: roomMutationKeys.create,
    mutationFn: roomTypeService.create,
    onSuccess: (res) => {
      toast.success(res?.message || "Room type created successfully.");
      queryClient.invalidateQueries({
        queryKey: roomKeys.all,
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
    getValues,
    formState: { errors },
    reset,
  } = useForm<CreateRoomTypeForm, any, CreateRoomType>({
    resolver: zodResolver(CreateRoomTypeSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return {
    submit: (data: CreateRoomType) => mutate(data),
    isPending,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
    reset,
  };
}
