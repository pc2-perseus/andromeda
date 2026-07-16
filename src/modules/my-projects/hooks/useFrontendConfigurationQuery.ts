import { useQuery } from "@tanstack/react-query";
import getFrontendConfiguration from "../api/getFrontendConfiguration.ts";

export default function useFrontendConfigurationQuery() {
    return useQuery({
        queryKey: ["frontend-configuration"],
        queryFn: getFrontendConfiguration,
    });
}
