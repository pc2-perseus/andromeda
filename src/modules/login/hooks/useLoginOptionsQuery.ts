import { useQuery } from "@tanstack/react-query";
import getLoginOptions from "../api/getLoginOptions.ts";

export default function useLoginOptionsQuery() {
    return useQuery({
        queryKey: ["login-options"],
        queryFn: getLoginOptions,
    });
}
