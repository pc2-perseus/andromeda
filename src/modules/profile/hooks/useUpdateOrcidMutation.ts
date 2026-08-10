import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateOrcid from "../api/updateOrcid.ts";

export default function useUpdateOrcidMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (orcid: string) => updateOrcid(orcid),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });
}
