import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { customerKeys, customerMutationKeys } from "../customer.keys";
import { customerService } from "../customer.service";
import {
  type UpdateCustomer,
  UpdateCustomerSchema,
} from "../schema/updateCustomer.schema";

export function useUpdateCustomer(id: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: customerMutationKeys.update,
    mutationFn: (data: UpdateCustomer) => customerService.update(id, data),
    onSuccess: (res) => {
      toast.success(res?.message || "Customer updated successfully");
      queryClient.invalidateQueries({
        queryKey: customerKeys.lists(),
      });
    },
    onError: notifyError,
  });

  return mutation;
}

export function useUpdateCustomerFacade(id: string) {
  const { mutate, isPending, isSuccess } = useUpdateCustomer(id);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<UpdateCustomer>({
    resolver: zodResolver(UpdateCustomerSchema),
  });

  return {
    submit: (data: UpdateCustomer) => mutate(data),
    isPending,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
  };
}
