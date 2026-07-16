import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project } from "../../../types/perseus/Project.ts";
import saveProposal from "../api/saveProposal.ts";
import { useProjectStore } from "../store/project.ts";

export const saveProposalMutationKey = ["compute-proposal", "save"];

export default function useSaveProposalMutation() {
    const queryClient = useQueryClient();
    const setId = useProjectStore((state) => state.setId);

    return useMutation({
        mutationKey: saveProposalMutationKey,
        mutationFn: (project: Project) => saveProposal(project),
        onSuccess: async (id) => {
            if (id) {
                setId(id);
                await queryClient.invalidateQueries({
                    queryKey: ["compute-proposal", id],
                });
            }

            await queryClient.invalidateQueries({
                queryKey: ["compute-proposals"],
            });
        },
    });
}
