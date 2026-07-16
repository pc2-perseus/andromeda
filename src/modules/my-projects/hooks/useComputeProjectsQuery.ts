import { useQuery } from "@tanstack/react-query";
import getComputeProjects from "../api/getComputeProjects.ts";

export default function useComputeProjectsQuery() {
    return useQuery({
        queryKey: ["my-compute-projects"],
        queryFn: getComputeProjects,
    });
}
