import { useIsMutating } from "@tanstack/react-query";
import { submitProposalMutationKey } from "./useSubmitProposalMutation.ts";

export default function useIsSubmitting(): boolean {
    return useIsMutating({ mutationKey: submitProposalMutationKey }) > 0;
}
