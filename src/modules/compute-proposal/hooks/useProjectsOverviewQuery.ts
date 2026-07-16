import { useQuery } from "@tanstack/react-query";
import getProjectsOverview from "../api/getProjectsOverview.ts";

export default function useProjectsOverviewQuery() {
    return useQuery({
        queryKey: ["my-projects"],
        queryFn: getProjectsOverview,
    });
}
