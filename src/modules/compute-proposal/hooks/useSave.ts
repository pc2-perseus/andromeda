import { projectsEqual, useProjectStore } from "../store/project.ts";
import useSaveProposalMutation from "./useSaveProposalMutation.ts";
import useIsSaving from "./useIsSaving.ts";
import useIsSubmitting from "./useIsSubmitting.ts";

export default function useSave() {
    const project = useProjectStore((state) => state.project);
    const savedProject = useProjectStore((state) => state.savedProject);
    const markSaved = useProjectStore((state) => state.markSaved);
    const saveMutation = useSaveProposalMutation();
    const isSaving = useIsSaving();
    const isSubmitting = useIsSubmitting();

    async function save(): Promise<string | null> {
        if (isSaving || isSubmitting || projectsEqual(project, savedProject)) {
            return null;
        }

        try {
            const id = await saveMutation.mutateAsync(project);

            markSaved({
                ...project,
                _id: id ?? project._id,
            });

            return id;
        } catch {
            return null;
        }
    }

    return {
        isSaving,
        save,
        error: saveMutation.error?.message ?? null,
    };
}
