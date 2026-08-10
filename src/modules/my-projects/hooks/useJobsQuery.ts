import getJobs from "../api/getJobs.ts";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useJobsQuery(params: {
    projectOid: string;
    computeProjectId: string;
    page: number;
    pageSize: number;
    groupId?: number;
    enabled?: boolean;
}) {
    return useQuery({
        queryKey: ["jobs", params],
        enabled: params.enabled ?? true,
        placeholderData: keepPreviousData,
        queryFn: () =>
            getJobs(
                params.projectOid,
                params.computeProjectId,
                params.page,
                params.pageSize,
                params.groupId
            ),
    });
}
