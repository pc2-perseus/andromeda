import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import isoToDates from "../../../utils/isoToDates.ts";
import type { Job } from "../../../types/perseus/Job.ts";

export default async function getJobs(
    projectOid: string,
    computeProjectId: string,
    page: number = 1,
    pageSize: number = 100,
    groupId?: number
): Promise<Job[]> {
    const response = await makeAPICall<{
        jobs: Job[];
    }>(
        HTTPMethod.GET,
        `/perseus/service/Andromeda/jobs/${projectOid}/${computeProjectId}${groupId !== undefined ? `/group/${groupId}` : ""}?page=${page}&page_size=${pageSize}`,
        undefined,
        true
    );

    return isoToDates(response.jobs);
}
