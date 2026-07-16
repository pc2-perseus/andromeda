import { useSuspenseQuery } from "@tanstack/react-query";
import getAuthData from "../api/getAuthData.ts";

export default function useAuthQuery() {
    return useSuspenseQuery({
        queryKey: ["auth"],
        queryFn: getAuthData,
    });
}
