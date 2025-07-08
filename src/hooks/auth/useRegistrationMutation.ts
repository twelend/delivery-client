import { useMutation } from "@tanstack/react-query";

import { TypeRegisterSchema } from "@/features/auth/schemes";
import { authService } from "@/features/auth/services/auth.service";
import { messageHandler } from "@/shared/message-handler";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export function useRegistrationMutation() {
  const router = useRouter();

  const { mutate: register, isPending: isLoadingRegister } = useMutation({
    mutationKey: ["register user"],
    mutationFn: ({ values }: { values: TypeRegisterSchema }) => {
      return authService.register(values);
    },
    onSuccess: () => {
      toast.success("Вы успешно зарегистрировались", {
        description: "Добро пожаловать! Войдите в аккаунт, чтобы начать пользоваться сервисом",
      });
      // router.push("/profile");
    },
    onError: (error) => {
      toast("Пользователь уже существует", {
        action: {
          label: "Войти",
          onClick: () => router.push("/auth/login"),
        },
      });
    },
  });

  return { register, isLoadingRegister };
}
