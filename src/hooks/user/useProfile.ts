import { tokenUtils } from "@/shared/utils/token.utils";
import { DecodedToken } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

export function useProfile() {
    const { data: user, isLoading: isLoadingUser} = useQuery({
        queryKey: ['user'],
        queryFn: () => {
            const token = tokenUtils.getToken();
            const decodedToken = jwtDecode(token ?? "") as DecodedToken;
            return JSON.parse(decodedToken?.subject || "{}");
        },
    })

    return { user, isLoadingUser }
}