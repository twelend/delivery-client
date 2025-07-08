import { TypeUserSchema } from "@/features/user/schemes";
import { userService } from "@/features/user/services";
import { messageHandler } from "@/shared/message-handler";
import { tokenUtils } from "@/shared/utils/token.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateMutation() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isLoadingUpdateUser } = useMutation({
    mutationKey: ["update user"],
    mutationFn: (values: any) => {
      return userService.updateUser(values);
    },
    onSuccess: (response: any) => {
      toast.success("Данные успешно обновлены");
      tokenUtils.setToken(response.data.token);

      // Тут просто инвалидируем кеш пользователя, чтобы обновить userInfo
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(`Ошибка сервера: ${error.message}`, {
        description: "Попробуйте позже...",
      });
    },
  });

  return { updateUser, isLoadingUpdateUser };
}
