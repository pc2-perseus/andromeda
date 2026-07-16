import getProject from "../api/getProject.ts";
import { useQuery } from "@tanstack/react-query";

export default function useMyProjectQuery(id: string) {
    return useQuery({
        queryKey: ["my-project", id],
        queryFn: () => getProject(id),
        enabled: id !== "",
    });
}
