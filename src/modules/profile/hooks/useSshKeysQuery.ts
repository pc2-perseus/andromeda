import { useQuery } from "@tanstack/react-query";
import getSshKeys from "../api/getSshKeys.ts";

export default function useSshKeysQuery() {
    return useQuery({
        queryKey: ["ssh-keys"],
        queryFn: getSshKeys,
    });
}
