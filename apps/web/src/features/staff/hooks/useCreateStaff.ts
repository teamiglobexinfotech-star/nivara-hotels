import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import {
  type CreateStaff,
  CreateStaffSchema,
} from "../schema/createStaff.schema";
import { staffService } from "../staff.service";

const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["staff", "createStaff"],
    mutationFn: staffService.createStaff,
    onSuccess: (res) => {
      toast.success(res?.message || "");
      queryClient.invalidateQueries({
        queryKey: ["staff", "staffs"],
      });
    },
    onError: notifyError,
  });
};

export const useCreateStaffFacade = () => {
  const { mutate, isPending, isSuccess } = useCreateStaff();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
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
  };
};
