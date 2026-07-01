import type { Resource } from "../types/perseus/Resource.ts";

/**
 * Creates ready-to-use values for resource unit and resource unit factor.
 * @param resource
 */
export default function resourceUnit(resource: Resource | undefined): {
    unit: string;
    unitFactor: number;
} {
    return {
        unit:
            resource === undefined || resource.display_unit === null
                ? ""
                : ` ${resource.display_unit}`,
        unitFactor: resource === undefined ? 1 : resource.display_unit_factor,
    };
}
