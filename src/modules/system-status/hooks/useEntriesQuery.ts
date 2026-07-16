import { useQuery } from "@tanstack/react-query";
import getEntries from "../api/getEntries.ts";

export default function useEntriesQuery() {
    return useQuery({
        queryKey: ["system-status-entries"],
        queryFn: getEntries,
    });
}
