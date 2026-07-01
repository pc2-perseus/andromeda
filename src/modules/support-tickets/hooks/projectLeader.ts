import type { MyProject } from "../../my-projects/types/project.ts";

export function isProjectLeader(
    project: MyProject | null,
    personOid: string | null
): boolean {
    return (
        project !== null &&
        personOid !== null &&
        (project.principal_investigator_id === personOid ||
            project.person_of_contact_id === personOid)
    );
}
