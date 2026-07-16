import type { MyProject } from "../types/project.ts";
import useAuth from "../../../hooks/useAuth.ts";

export default function useIsPIorPC(project: MyProject): boolean {
    const { oid } = useAuth();

    return (
        oid !== null &&
        (oid === project.principal_investigator_id ||
            oid === project.person_of_contact_id)
    );
}
