import { useMutation, useQueryClient } from "@tanstack/react-query";
import addUser from "../api/addUser.ts";

export default function useAddUserMutation(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            computeProjectId,
            personId,
        }: {
            computeProjectId: string;
            personId: string;
        }) =>
            addUser({
                projectId: projectId,
                computeProjectId,
                personId: personId,
            }),
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
