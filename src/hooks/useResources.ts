import useResourcesQuery from "./useResourcesQuery.ts";

export default function useResources() {
    return useResourcesQuery().data;
}
