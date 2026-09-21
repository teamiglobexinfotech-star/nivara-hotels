import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { customerService } from "../customer.service";
import {
  type CreateCustomer,
  CreateCustomerSchema,
} from "../schema/createCustomer.schema";

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["customers", "createCustomer"],
    mutationFn: customerService.createCustomer,
    onSuccess: (res) => {
      toast.success(res?.message || "Customer registered successfully.");
      queryClient.invalidateQueries({
        queryKey: ["customers", "customers"],
      });
    },
    onError: notifyError,
  });
  return mutation;
}

export function useCreateCustomerFacade() {
  const { mutate, isPending, isSuccess } = useCreateCustomer();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<CreateCustomer>({
    resolver: zodResolver(CreateCustomerSchema),
  });

  return {
    submit: (data: CreateCustomer) => mutate(data),
    isPending,
    isSuccess,
    register,
    handleSubmit,
    errors,
    getValues,
  };
}
