import { useQuery } from "@tanstack/react-query";
import getProfileOptions from "../api/getProfileOptions.ts";

export default function useProfileOptionsQuery() {
    return useQuery({
        queryKey: ["profile-options"],
        queryFn: getProfileOptions,
    });
}
