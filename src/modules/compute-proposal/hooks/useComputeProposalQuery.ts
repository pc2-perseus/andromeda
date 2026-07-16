import { useQuery } from "@tanstack/react-query";
import getProposal from "../api/getProposal.ts";

export default function useComputeProposalQuery(id: string | undefined) {
    return useQuery({
        queryKey: ["compute-proposal", id],
        queryFn: () => getProposal(id as string),
        enabled: Boolean(id),
    });
}
