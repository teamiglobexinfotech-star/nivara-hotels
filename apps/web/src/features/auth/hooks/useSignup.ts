import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { notifyError } from "@/lib/notification";
import { authService } from "../auth.service";
import { SignupSchema, type Signup } from "../schema/signup.schema";

const useSignup = () => {
  return useMutation({
    mutationKey: ["academy", "signup"],
    mutationFn: authService.signup,
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: notifyError,
  });
};

export const useSignupFacade = () => {
  const { mutate, isPending, isSuccess } = useSignup();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
  });

  return {
    submit: (data: Signup) => mutate(data),
    isPending,
    register,
    handleSubmit,
    errors,
    isSuccess,
    getValues,
  };
};
