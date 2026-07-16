import { useProjectStore } from "../store/project.ts";
import useSubmitProposalMutation from "./useSubmitProposalMutation.ts";
import useIsSubmitting from "./useIsSubmitting.ts";

export default function useSubmit() {
    const project = useProjectStore((state) => state.project);
    const submitMutation = useSubmitProposalMutation();
    const isSubmitting = useIsSubmitting();

    async function submit(): Promise<boolean> {
        try {
            return await submitMutation.mutateAsync(project);
        } catch {
            return false;
        }
    }

    return {
        isSubmitting,
        submit,
        error: submitMutation.error?.message ?? null,
    };
}
