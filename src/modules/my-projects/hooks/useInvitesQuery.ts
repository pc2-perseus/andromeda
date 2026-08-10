import { useQuery } from "@tanstack/react-query";
import getInvites from "../api/getInvites.ts";

export default function useInvitesQuery(projectId: string) {
    return useQuery({
        queryKey: ["project-management", projectId, "user-invites"],
        queryFn: () => getInvites(projectId),
        enabled: projectId !== "",
    });
}
