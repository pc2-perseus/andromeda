import getProposals from "../api/getProposals.ts";
import { useQuery } from "@tanstack/react-query";

export default function useComputeProposalsQuery() {
    return useQuery({
        queryKey: ["compute-proposals"],
        queryFn: getProposals,
    });
}
