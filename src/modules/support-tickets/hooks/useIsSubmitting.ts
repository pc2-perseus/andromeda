import { useIsMutating } from "@tanstack/react-query";
import { submitMutationKey } from "./useSubmitMutation.ts";

export default function useIsSubmitting(): boolean {
    return useIsMutating({ mutationKey: submitMutationKey }) > 0;
}
