import { useMutation, useQueryClient } from "@tanstack/react-query";
import unlinkProvider from "../api/unlinkProvider.ts";

export default function useUnlinkProviderMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (provider: string) => unlinkProvider(provider),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["linked-providers"],
            });
        },
    });
}
