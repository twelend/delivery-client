import { orderService } from "@/features/order";
import { useQuery } from "@tanstack/react-query";

export function useGetHistoryMenu() {
  const { data: historyMenu, isLoading: isLoadingHistoryMenu } = useQuery({
    queryKey: ["history-menu"],
    queryFn: () => orderService.getLastOrders(),
  });

  return { historyMenu, isLoadingHistoryMenu };
}
