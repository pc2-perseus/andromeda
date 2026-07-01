import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import isoToDates from "../../../utils/isoToDates.ts";
import type { Job } from "../../../types/perseus/Job.ts";

export default async function getJobs(
    projectOid: string,
    computeProjectId: string,
    page: number = 1,
    pageSize: number = 100
): Promise<Job[]> {
    const call = await makeAPICall<{
        jobs: Job[];
    }>(
        HTTPMethod.GET,
        `/perseus/service/Andromeda/jobs/${projectOid}/${computeProjectId}?page=${page}&page_size=${pageSize}`,
        undefined,
        true
    );

    return call.statusCode === 200 && call.value !== null
        ? isoToDates(call.value.jobs)
        : [];
}
