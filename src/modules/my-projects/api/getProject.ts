import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { MyProject } from "../types/project.ts";
import isoToDates from "../../../utils/isoToDates.ts";

export default async function getProject(
    id: string
): Promise<MyProject | null> {
    const call = await makeAPICall<MyProject>(
        HTTPMethod.GET,
        `/perseus/service/Andromeda/projects/${id}`,
        undefined,
        true
    );

    return call.statusCode === 200 && call.value !== null
        ? isoToDates(call.value)
        : null;
}
