import { useQuery } from "@tanstack/react-query";
import getUsers from "../api/getUsers.ts";

export default function useUsersQuery(projectId: string) {
    return useQuery({
        queryKey: ["project-management", projectId, "users"],
        queryFn: () => getUsers(projectId),
    });
}
