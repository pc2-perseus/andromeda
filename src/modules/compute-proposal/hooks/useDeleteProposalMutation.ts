import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteProposal from "../api/deleteProposal.ts";

export default function useDeleteProposalMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (proposalId: string) => deleteProposal(proposalId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["compute-proposals"],
            });
        },
    });
}
