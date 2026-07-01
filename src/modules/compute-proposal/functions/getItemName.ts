import type { Resource } from "../../../types/perseus/Resource.ts";
import type { Cluster } from "../../../types/perseus/Cluster.ts";

export default function getItemName(
    item: Resource | Cluster,
    alternativeNames: {
        type: "cluster" | "resource";
        id: string;
        name: string;
    }[]
): string {
    return (
        alternativeNames.filter(
            (elem) =>
                elem.type === ("cluster_id" in item ? "resource" : "cluster") &&
                elem.id === item.id
        )[0]?.name ?? item.name
    );
}
