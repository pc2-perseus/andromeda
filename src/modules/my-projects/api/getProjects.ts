import makeAPICall from "../../../api/makeAPICall.ts";
import { HTTPMethod } from "../../../api/HTTPMethod.ts";
import type { MyProjectListItem } from "../types/project.ts";

export default async function getProjects(): Promise<MyProjectListItem[]> {
    const response = await makeAPICall<{
        items: MyProjectListItem[];
        count: number;
    }>(HTTPMethod.GET, "/perseus/service/Andromeda/projects/overview");

    return response.items;
}
