import getUsage from "../api/getUsage.ts";
import { useQuery } from "@tanstack/react-query";

export default function useUsageQuery(params: {
    projectId: string;
    computeProjectId: string;
}) {
    return useQuery({
        queryKey: ["usage", params],
        queryFn: () => getUsage(params.projectId, params.computeProjectId),
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 60 * 1000,
    });
}
