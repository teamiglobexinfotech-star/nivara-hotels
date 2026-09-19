import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { notifyError } from "@/lib/notification";
import {
  UpdateCustomerSchema,
  type UpdateCustomer,
} from "../schema/updateCustomer.schema";
import { customerService } from "../customer.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useUpdateCustomer(id: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["customers", "updateCustomer"],
    mutationFn: (data: UpdateCustomer) =>
      customerService.updateCustomer(id, data),
    onSuccess: (res) => {
      toast.success(res?.message || "Customer updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["customers", "customers"],
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
