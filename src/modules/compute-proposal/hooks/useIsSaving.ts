import { useIsMutating } from "@tanstack/react-query";
import { saveProposalMutationKey } from "./useSaveProposalMutation.ts";

export default function useIsSaving(): boolean {
    return useIsMutating({ mutationKey: saveProposalMutationKey }) > 0;
}
