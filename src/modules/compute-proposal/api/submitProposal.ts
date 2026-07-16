import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { Project } from "../../../types/perseus/Project.ts";

export default async function submitProposal(
    project: Project
): Promise<boolean> {
    const response = await makeAPICall<{
        success: boolean;
    }>(HTTPMethod.POST, "/perseus/service/Andromeda/compute-proposal/submit", {
        project: project,
    });

    return response.success;
}
