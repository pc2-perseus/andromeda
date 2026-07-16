import { useQuery } from "@tanstack/react-query";
import getServices from "../api/getServices.ts";

export default function useServicesQuery() {
    return useQuery({
        queryKey: ["system-status-services"],
        queryFn: getServices,
    });
}
