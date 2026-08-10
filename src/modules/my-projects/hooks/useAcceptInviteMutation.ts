import { useMutation, useQueryClient } from "@tanstack/react-query";
import acceptInvite from "../api/acceptInvite.ts";

export default function useAcceptInviteMutation(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            token,
            invitationId,
        }: {
            token: string;
            invitationId: string;
        }) => acceptInvite({ projectId, token, invitationId }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["my-compute-projects"],
            });
        },
    });
}
