import { useMutation } from "@tanstack/react-query";
import claimPC from "../api/claimPC.ts";

export default function useClaimPCMutation() {
    return useMutation({
        mutationFn: ({
            proposalId,
            token,
        }: {
            proposalId: string;
            token: string;
        }) => claimPC(proposalId, token),
    });
}
