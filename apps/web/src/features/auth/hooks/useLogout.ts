import { useMutation } from "@tanstack/react-query";
import { notifyError } from "@/lib/notification";
import { authService } from "../auth.service";

export function useLogout() {
  const { isPending, mutate } = useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: authService.logout,
    onSuccess: () => {
      window.location.href = "/login";
    },
    onError: notifyError,
  });

  return {
    logout: mutate,
    isLoading: isPending,
  };
}
