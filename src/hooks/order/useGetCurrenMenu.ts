import { orderService } from "@/features/order";
import { useQuery } from "@tanstack/react-query";

export function useGetCurrenMenu() {
  const { data: currentMenu, isLoading: isLoadingCurrentMenu, } = useQuery({
    queryKey: ["current-menu"],
    queryFn: () => orderService.getCurrentMenu(),
  });

  return { currentMenu, isLoadingCurrentMenu };
}

