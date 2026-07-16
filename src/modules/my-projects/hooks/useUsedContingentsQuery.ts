import getUsedContingents from "../api/getUsedContingents.ts";
import { useQuery } from "@tanstack/react-query";

export default function useUsedContingentsQuery(params: {
    projectId: string;
    computeProjectId: string;
}) {
    return useQuery({
        queryKey: ["used-contingents", params],
        queryFn: () =>
            getUsedContingents(params.projectId, params.computeProjectId),
    });
}
