import { orderService } from "@/features/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateOrderMutation() {
    const queryClient = useQueryClient();


    const {mutate: create, isPending: isLoadingCreate } = useMutation({
        mutationKey: ["create order"],
        mutationFn: ( values: any ) => {
            return orderService.createOrder(values)
        },
        onSuccess: (response: any) => {
            toast.success("Заказ успешно создан", {
                duration: 3000,
            })
            queryClient.invalidateQueries({ queryKey: ["history-menu"] });
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
            toast.error("Не удалось создать заказ", {
                duration: 3000,
            })
        }
    })

    return { create, isLoadingCreate }
}