import { useSuspenseQuery } from "@tanstack/react-query";
import getResourceData from "../api/getResourceData.ts";

export default function useResourcesQuery() {
    return useSuspenseQuery({
        queryKey: ["resource-data"],
        queryFn: getResourceData,
    });
}
