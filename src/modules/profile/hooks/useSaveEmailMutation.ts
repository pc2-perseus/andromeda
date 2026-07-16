import { useMutation, useQueryClient } from "@tanstack/react-query";
import saveEmail from "../api/saveEmail.ts";

export default function useSaveEmailMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (email: string) => saveEmail(email),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });
}
