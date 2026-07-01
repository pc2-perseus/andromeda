import { useMemo } from "react";
import type { Resource } from "../../../types/perseus/Resource.ts";
import useModuleConfig from "./useModuleConfig.ts";
import useProject from "./useProject.ts";

export default (resource: Resource): number | undefined => {
    const config = useModuleConfig();
    const project = useProject();

    return useMemo(() => {
        if (
            !config ||
            project.project_type === null ||
            !(project.project_type in config.resource_limits)
        ) {
            return undefined;
        }

        const sharedLimitItems = config.resource_limits[
            project.project_type
        ].filter(
            (item) =>
                item.resource_ids.length > 1 &&
                item.resource_ids.includes(resource.id) &&
                item.max !== undefined
        );

        if (sharedLimitItems.length === 0) {
            return undefined;
        }

        const remainingAmounts = sharedLimitItems.map((item) => {
            const total = project.requested_resources.reduce((acc, rv) => {
                return (
                    acc +
                    (item.resource_ids.includes(rv.resource_id) ? rv.value : 0)
                );
            }, 0);
            return (item.max as number) - total;
        });

        return Math.min(...remainingAmounts);
    }, [
        config,
        project.project_type,
        project.requested_resources,
        resource.id,
    ]);
};
