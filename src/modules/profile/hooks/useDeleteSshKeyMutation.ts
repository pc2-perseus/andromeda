import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteSshKey from "../api/deleteSshKey.ts";

export default function useDeleteSshKeyMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteSshKey(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["ssh-keys"] });
        },
    });
}
