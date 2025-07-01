import { userService } from "@/features/user/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
    const { data: user, isLoading: isLoadingUser} = useQuery({
        queryKey: ['user'],
        queryFn: () => userService.getUser(),
    })

    return { user, isLoadingUser }
}