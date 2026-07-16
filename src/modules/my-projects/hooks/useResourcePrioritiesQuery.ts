import { useQuery } from "@tanstack/react-query";
import getResourcePriorities from "../api/getResourcePriorities.ts";

export default function useResourcePrioritiesQuery() {
    return useQuery({
        queryKey: ["resource-priorities"],
        queryFn: () => getResourcePriorities(),
    });
}
