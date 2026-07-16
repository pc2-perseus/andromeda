import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project } from "../../../types/perseus/Project.ts";
import submitProposal from "../api/submitProposal.ts";

export const submitProposalMutationKey = ["compute-proposal", "submit"];

export default function useSubmitProposalMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: submitProposalMutationKey,
        mutationFn: (project: Project) => submitProposal(project),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["compute-proposals"],
            });
        },
    });
}
