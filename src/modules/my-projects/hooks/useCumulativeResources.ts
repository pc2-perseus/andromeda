import useResources from "../../../contexts/resources";

export default function useCumulativeResources() {
    const {
        resourceData: { resources },
    } = useResources();

    return resources.filter((r) => r.resource_type == "cumulative");
}
