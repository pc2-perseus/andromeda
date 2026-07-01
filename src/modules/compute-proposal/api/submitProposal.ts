import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { Project } from "../../../types/perseus/Project.ts";

export default async function submitProposal(
    project: Project
): Promise<boolean> {
    const call = await makeAPICall<{
        success: boolean;
    }>(HTTPMethod.POST, "/perseus/service/Andromeda/compute-proposal/submit", {
        project: project,
    });

    return call.statusCode === 200 && call.value !== null
        ? call.value.success
        : false;
}
