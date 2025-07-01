import { useMutation } from "@tanstack/react-query";

import { authService } from "@/features/auth/services/auth.service";
import { messageHandler } from "@/shared/message-handler";
import { toast } from "sonner";
import { TypeLoginSchema } from "@/features/auth/schemes/login.schema";
import { useRouter } from "next/navigation";

export function useLoginMutation() {
  const router = useRouter();

  const { mutate: login, isPending: isLoadingLogin } = useMutation({
    mutationKey: ["login user"],
    mutationFn: ({ values }: { values: TypeLoginSchema }) => {
      return authService.login(values);
    },
    onSuccess: (response: any) => {
      
      if (response.status === 400) {
        toast.error("Пользователь не существует");
      } else if (response.status === 403){
        toast.error("Неверный логин или пароль");
      } else {
        toast.success("Успешный вход", {
          description:
            "Осторожно, после входа может возникнуть чувство голода!",
          duration: 3000,
        });
        router.push("/profile");
      }
    },
    onError: (error) => {
      messageHandler(error);
    },
  });

  return { login, isLoadingLogin };
}
