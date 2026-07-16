import { useQuery } from "@tanstack/react-query";
import getLinkedProviders from "../api/getLinkedProviders.ts";

export default function useLinkedProvidersQuery() {
    return useQuery({
        queryKey: ["linked-providers"],
        queryFn: getLinkedProviders,
    });
}
