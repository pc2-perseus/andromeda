import dayjs from "dayjs";
import { useMemo } from "react";
import type {
    UsedContingent,
    UsedContingentPhase,
} from "../../../types/perseus/UsedContingent.ts";
import type { Resource } from "../../../types/perseus/Resource.ts";
import type { ResourceValue } from "../../../types/perseus/ResourceValue.ts";

export type ClusterResourceItem = {
    resourceId: string;
    resourceType: Resource["resource_type"];
    name: string;
    value: number;
    max: number;
    unit: string;
    percent: number;
};

export type ClusterResourceGroup = {
    id: string;
    name: string;
    resources: ClusterResourceItem[];
};

function selectPhase(
    phases: UsedContingentPhase[]
): UsedContingentPhase | null {
    if (phases.length === 0) {
        return null;
    }

    const today = dayjs();

    const currentPhase = phases.find(
        (phase) =>
            (today.isAfter(dayjs(phase.start)) ||
                today.isSame(dayjs(phase.start))) &&
            (today.isBefore(dayjs(phase.end)) || today.isSame(dayjs(phase.end)))
    );
    if (currentPhase) {
        return currentPhase;
    }

    return [...phases].sort(
        (left, right) => dayjs(right.end).valueOf() - dayjs(left.end).valueOf()
    )[0];
}

function selectGrantedResourceValue(
    grantedResources: ResourceValue[],
    resourceId: string,
    computeProjectId: string
): ResourceValue | null {
    const matchingResourceValues = grantedResources.filter(
        (resourceValue) =>
            resourceValue.resource_id === resourceId &&
            resourceValue.compute_project_id === computeProjectId
    );

    if (matchingResourceValues.length === 0) {
        return null;
    }

    const today = dayjs();

    const currentResourceValue = matchingResourceValues.find(
        (resourceValue) =>
            (today.isAfter(dayjs(resourceValue.start)) ||
                today.isSame(dayjs(resourceValue.start))) &&
            (today.isBefore(dayjs(resourceValue.end)) ||
                today.isSame(dayjs(resourceValue.end)))
    );
    if (currentResourceValue) {
        return currentResourceValue;
    }

    return [...matchingResourceValues].sort(
        (left, right) => dayjs(right.end).valueOf() - dayjs(left.end).valueOf()
    )[0];
}

export default function useClusterResourceGroups({
    usedContingents,
    grantedResources,
    computeProjectId,
    resourceMap,
    clusterNameForId,
}: {
    usedContingents: UsedContingent[];
    grantedResources: ResourceValue[];
    computeProjectId: string;
    resourceMap: Map<string, Resource>;
    clusterNameForId: (clusterId: string) => string;
}) {
    return useMemo(() => {
        const grouped = new Map<string, ClusterResourceItem[]>();

        usedContingents.forEach((item) => {
            const resource = resourceMap.get(item.resource_id);
            if (!resource) {
                return;
            }

            const phase = selectPhase(item.phases);
            if (!phase) {
                return;
            }

            const grantedResourceValue = selectGrantedResourceValue(
                grantedResources,
                item.resource_id,
                computeProjectId
            );
            if (!grantedResourceValue) {
                return;
            }

            const factor = resource.display_unit_factor || 1;
            const value = phase.value / factor;
            const max = grantedResourceValue.value / factor;
            const percent = max > 0 ? Math.min((value / max) * 100, 100) : 0;
            const unit = resource.display_unit
                ? ` ${resource.display_unit}`
                : "";

            const list = grouped.get(resource.cluster_id) ?? [];
            list.push({
                resourceId: resource.id,
                resourceType: resource.resource_type,
                name: resource.name,
                value,
                max,
                unit,
                percent,
            });
            grouped.set(resource.cluster_id, list);
        });

        const clusterIds = [...grouped.keys()].sort((left, right) =>
            clusterNameForId(left).localeCompare(clusterNameForId(right))
        );

        const clusters: ClusterResourceGroup[] = clusterIds.map(
            (clusterId) => ({
                id: clusterId,
                name: clusterNameForId(clusterId),
                resources:
                    grouped
                        .get(clusterId)
                        ?.sort((left, right) =>
                            left.name.localeCompare(right.name)
                        ) ?? [],
            })
        );

        return {
            clusterIds,
            clusters,
        };
    }, [
        usedContingents,
        grantedResources,
        computeProjectId,
        resourceMap,
        clusterNameForId,
    ]);
}
