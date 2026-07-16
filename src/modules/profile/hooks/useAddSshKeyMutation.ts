import { useMutation, useQueryClient } from "@tanstack/react-query";
import addSshKey from "../api/addSshKey.ts";

export default function useAddSshKeyMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            name,
            pubSshKey,
        }: {
            name: string;
            pubSshKey: string;
        }) => addSshKey(name, pubSshKey),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["ssh-keys"] });
        },
    });
}
