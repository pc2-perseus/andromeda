import getProjects from "../api/getProjects.ts";
import { useQuery } from "@tanstack/react-query";

export default function useMyProjectsQuery() {
    return useQuery({ queryKey: ["my-projects"], queryFn: getProjects });
}
