import { useSuspenseQuery } from "@tanstack/react-query";
import getConfig from "../api/getConfig.ts";

export default function useConfigQuery() {
    return useSuspenseQuery({
        queryKey: ["config"],
        queryFn: getConfig,
    });
}
