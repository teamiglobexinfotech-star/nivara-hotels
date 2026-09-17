import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { notifyError } from "@/lib/notification";
import { staffService } from "../staff.service";
import {
  CreateStaffSchema,
  type CreateStaff,
} from "../schema/createStaff.schema";

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
