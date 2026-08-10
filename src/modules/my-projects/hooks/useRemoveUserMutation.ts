import { useMutation, useQueryClient } from "@tanstack/react-query";
import removeUser from "../api/removeUser.ts";

export default function useRemoveUserMutation(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            computeProjectId,
            personId,
        }: {
            computeProjectId: string;
            personId: string;
        }) =>
            removeUser({
                projectId,
                computeProjectId,
                personId,
            }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["project-management", projectId, "users"],
            });
        },
    });
}
