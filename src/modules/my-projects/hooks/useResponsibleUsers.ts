import { useCallback, useEffect, useState } from "react";
import getResponsibleUsers from "../api/getResponsibleUsers.ts";
import type { Person } from "../../../types/perseus/Person.ts";

export default function useResponsibleUsers(projectId: string | null) {
    const [loading, setLoading] = useState<boolean>(projectId !== null);
    const [error, setError] = useState<string | null>(null);
    const [responsibleUsers, setResponsibleUsers] = useState<{
        principal_investigator: Person | null;
        person_of_contact: Person | null;
    } | null>(null);

    const fetchResponsibleUsers = useCallback(async () => {
        if (projectId === null) {
            setResponsibleUsers(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            setResponsibleUsers(await getResponsibleUsers(projectId));
        } catch {
            setError("There was an error loading responsible users");
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchResponsibleUsers();
    }, [fetchResponsibleUsers]);

    return {
        responsibleUsers,
        loading,
        error,
    };
}
