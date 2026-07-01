import type { Resource } from "../../../types/perseus/Resource.ts";
import type { ModuleConfig } from "../../../types/ModuleConfig.ts";
import type { Project } from "../../../types/perseus/Project.ts";
import type { ResourceValue } from "../../../types/perseus/ResourceValue.ts";

export default function getAddableResources(
    moduleConfig: ModuleConfig,
    project: Project,
    resources: Resource[]
): Resource[] {
    if (project.project_type === null) {
        return [];
    }

    if (!(project.project_type in moduleConfig.allowed_resources)) {
        return [];
    }

    const allowedResourceIds: string[] = moduleConfig.allowed_resources[
        project.project_type
    ].map((item) => item.resource_id);

    const allowedResources: Resource[] = resources.filter((r) =>
        allowedResourceIds.includes(r.id)
    );

    if (project.start === null || project.end === null) {
        return allowedResources;
    }

    const leftResources: { resource: Resource; start: Date; end: Date }[] =
        allowedResources.map((r) => {
            return {
                resource: r,
                start: new Date(
                    `${(project.start as Date).toISOString().split("T")[0]}T00:00:00Z`
                ),
                end: new Date(
                    `${(project.end as Date).toISOString().split("T")[0]}T23:59:59Z`
                ),
            };
        });

    project.requested_resources.forEach((requestedResource: ResourceValue) => {
        let i: number | null = null;
        leftResources.forEach((item, index) => {
            if (
                item.resource.id === requestedResource.resource_id &&
                item.start <= requestedResource.start &&
                item.end >= requestedResource.end
            ) {
                i = index;
            }
        });
        if (i !== null) {
            if (
                leftResources[i].start.toISOString() ===
                    requestedResource.start.toISOString() &&
                leftResources[i].end.toISOString() ===
                    requestedResource.end.toISOString()
            ) {
                leftResources.splice(i, 1);
                return;
            }

            if (
                leftResources[i].start < requestedResource.start &&
                leftResources[i].end > requestedResource.end
            ) {
                const newStart: Date = new Date(requestedResource.end);
                newStart.setDate(requestedResource.end.getDate() + 1);

                leftResources.push({
                    resource: { ...leftResources[i].resource },
                    start: newStart,
                    end: new Date(requestedResource.end),
                });

                leftResources[i].end.setDate(
                    requestedResource.start.getDate() - 1
                );
                return;
            }

            if (leftResources[i].start < requestedResource.start) {
                leftResources[i].start.setDate(
                    requestedResource.start.getDate() + 1
                );
            }

            if (leftResources[i].end > requestedResource.end) {
                leftResources[i].end.setDate(
                    requestedResource.end.getDate() - 1
                );
            }
        }
    });

    return leftResources.map((item) => item.resource);
}
