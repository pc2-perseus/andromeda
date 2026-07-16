import { useMutation, useQueryClient } from "@tanstack/react-query";
import saveNationalities from "../api/saveNationalities.ts";

export default function useSaveNationalitiesMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (nationalities: string[]) =>
            saveNationalities(nationalities),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });
}
