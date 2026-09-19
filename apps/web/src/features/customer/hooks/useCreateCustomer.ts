import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { notifyError } from "@/lib/notification";
import {
  CreateCustomerSchema,
  type CreateCustomer,
} from "../schema/createCustomer.schema";
import { customerService } from "../customer.service";

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
