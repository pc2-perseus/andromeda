import { useMutation } from "@tanstack/react-query";
import claimPI from "../api/claimPI.ts";

export default function useClaimPIMutation() {
    return useMutation({
        mutationFn: ({
            proposalId,
            token,
        }: {
            proposalId: string;
            token: string;
        }) => claimPI(proposalId, token),
    });
}
