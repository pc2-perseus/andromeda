import dayjs from "dayjs";
import { useMemo } from "react";
import type { ResourceValue } from "../../../types/perseus/ResourceValue.ts";
import useResourcePriorityMap, {
    type ResourcePriorityInfo,
} from "./useResourcePriorityMap.ts";
import useResourcePrioritiesQuery from "./useResourcePrioritiesQuery.ts";

export default function useCurrentResourcePriority({
    grantedResources,
    resourceId,
    computeProjectId,
}: {
    grantedResources: ResourceValue[];
    resourceId: string;
    computeProjectId: string;
}): ResourcePriorityInfo {
    const { data, isPending, isError } = useResourcePrioritiesQuery();
    const priorityLabelByValue = useResourcePriorityMap(data || []);

    return useMemo(() => {
        if (isPending) {
            return {
                label: "loading",
                color: null,
                textColor: null,
            };
        }

        if (isError) {
            return {
                label: "Error",
                color: null,
                textColor: null,
            };
        }

        const today = dayjs();
        const matchingResourcePriorities = grantedResources.filter(
            (resourceValue) =>
                resourceValue.resource_id === resourceId &&
                resourceValue.compute_project_id === computeProjectId
        );

        const currentPriority = matchingResourcePriorities.find(
            (resourceValue) =>
                (today.isAfter(dayjs(resourceValue.start)) ||
                    today.isSame(dayjs(resourceValue.start))) &&
                (today.isBefore(dayjs(resourceValue.end)) ||
                    today.isSame(dayjs(resourceValue.end)))
        );

        const fallbackPriority = [...matchingResourcePriorities].sort(
            (left, right) =>
                dayjs(right.end).valueOf() - dayjs(left.end).valueOf()
        )[0];

        return (
            priorityLabelByValue.get(
                (currentPriority ?? fallbackPriority)?.priority ?? Number.NaN
            ) ?? {
                label: "unknown",
                color: null,
                textColor: null,
            }
        );
    }, [
        grantedResources,
        resourceId,
        computeProjectId,
        priorityLabelByValue,
        isPending,
        isError,
    ]);
}
