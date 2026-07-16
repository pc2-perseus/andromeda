import useResources from "../../../hooks/useResources.ts";

export default function useCumulativeResources() {
    const { resources } = useResources();

    return resources.filter((r) => r.resource_type == "cumulative");
}
