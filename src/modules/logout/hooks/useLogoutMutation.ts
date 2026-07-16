import { useMutation } from "@tanstack/react-query";
import executeLogout from "../api/executeLogout.ts";

export default function useLogoutMutation() {
    return useMutation({
        mutationFn: (next: string) => executeLogout(next),
    });
}
