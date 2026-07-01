import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { MyProjectListItem } from "../types/project.ts";

export default async function getProjects(): Promise<MyProjectListItem[]> {
    const call = await makeAPICall<{
        items: MyProjectListItem[];
        count: number;
    }>(
        HTTPMethod.GET,
        "/perseus/service/Andromeda/projects/overview",
        undefined,
        true
    );

    return call.statusCode === 200 && call.value !== null
        ? call.value.items
        : [];
}
