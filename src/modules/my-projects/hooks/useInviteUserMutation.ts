import { useMutation, useQueryClient } from "@tanstack/react-query";
import inviteUser from "../api/inviteUser.ts";

export default function useInviteUserMutation(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            computeProjectId,
            email,
        }: {
            computeProjectId: string;
            email: string;
        }) => inviteUser({ projectId: projectId, computeProjectId, email }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["project-management", projectId],
            });
            await queryClient.invalidateQueries({
                queryKey: ["my-project", projectId],
            });
        },
    });
}
