import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { Project } from "../../../types/perseus/Project.ts";

export default async function saveProposal(
    project: Project
): Promise<string | null> {
    const response = await makeAPICall<{
        success: boolean;
        oid: string;
    }>(HTTPMethod.POST, "/perseus/service/Andromeda/compute-proposal/save", {
        project: project,
    });

    return response.oid;
}
