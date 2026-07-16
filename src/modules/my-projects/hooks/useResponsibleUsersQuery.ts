import getResponsibleUsers from "../api/getResponsibleUsers.ts";
import { useQuery } from "@tanstack/react-query";

export default function useResponsibleUsersQuery(projectId: string) {
    return useQuery({
        queryKey: ["my-projects", "responsible-users", projectId],
        queryFn: () => getResponsibleUsers(projectId),
    });
}
