import useJobSuggestions from "./useJobSuggestions.ts";
import useComputeProjectSelection from "./useComputeProjectSelection.ts";
import useProjectSelection from "./useProjectSelection.ts";

export default function useJobOptions(): {
    jobSuggestions: string[];
    jobSuggestionsLoading: boolean;
    jobSuggestionsError: string | null;
    suggestionLimit: number;
} {
    const { value: selectedProjectOid } = useProjectSelection();
    const { value: selectedComputeProjectId } = useComputeProjectSelection();

    const {
        suggestions: jobSuggestions,
        loading: jobSuggestionsLoading,
        error: jobSuggestionsError,
        suggestionLimit,
    } = useJobSuggestions(
        selectedProjectOid || null,
        selectedComputeProjectId || null
    );

    return {
        jobSuggestions,
        jobSuggestionsLoading,
        jobSuggestionsError,
        suggestionLimit,
    };
}
