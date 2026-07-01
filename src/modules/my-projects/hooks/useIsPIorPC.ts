import useAuthentication from "../../../contexts/authentication";
import type { MyProject } from "../types/project.ts";

export default function useIsPIorPC(project: MyProject): boolean {
    const { authData } = useAuthentication();

    return (
        authData.oid !== null &&
        (authData.oid === project.principal_investigator_id ||
            authData.oid === project.person_of_contact_id)
    );
}
