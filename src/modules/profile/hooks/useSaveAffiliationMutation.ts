import { useMutation, useQueryClient } from "@tanstack/react-query";
import saveAffiliation from "../api/saveAffiliation.ts";

export default function useSaveAffiliationMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (affiliationOid: string) => saveAffiliation(affiliationOid),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });
}
