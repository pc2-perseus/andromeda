import { useMutation, useQueryClient } from "@tanstack/react-query";
import makePC from "../api/makePC.ts";

export default function useMakePCMutation(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ personOid }: { personOid: string }) =>
            makePC({ projectId: projectId, personId: personOid }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["project-management", projectId],
            });
            await queryClient.invalidateQueries({
                queryKey: ["my-project", projectId],
            });
            await queryClient.invalidateQueries({
                queryKey: ["my-projects", "responsible-users", projectId],
            });
        },
    });
}
