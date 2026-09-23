import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import {
  type CreateStaff,
  CreateStaffSchema,
} from "../schema/createStaff.schema";
import type { UpdateStaff } from "../schema/updateStaff.schema";
import { staffKeys, staffMutationKeys } from "../staff.keys";
import { staffService } from "../staff.service";

const useUpdateStaff = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: staffMutationKeys.update,
    mutationFn: (data: UpdateStaff) => staffService.update(id, data),
    onSuccess: (res) => {
      toast.success(res?.message || "Staff updated successfully.");

      queryClient.invalidateQueries({
        queryKey: staffKeys.lists(),
      });
    },
    onError: notifyError,
  });
};

export const useUpdateStaffFacade = (id: string) => {
  const { mutate, isPending, isSuccess } = useUpdateStaff(id);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    control,
  } = useForm<CreateStaff>({
    resolver: zodResolver(CreateStaffSchema),
  });

  return {
    submit: (data: CreateStaff) => mutate(data),
    isPending,
    register,
    handleSubmit,
    errors,
    isSuccess,
    getValues,
    control,
  };
};
