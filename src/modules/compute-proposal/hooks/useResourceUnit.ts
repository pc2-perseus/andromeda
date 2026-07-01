import React from "react";
import resourceUnit from "../../../utils/resourceUnit.ts";
import type { Resource } from "../../../types/perseus/Resource.ts";

export default (resource: Resource) => {
    return React.useMemo(() => resourceUnit(resource), [resource]);
};
