import { useCallback, useEffect, useState } from "react";

// Custom imports
import useAuthentication from "../../../contexts/authentication";
import type { Project } from "../../../types/perseus/Project.ts";
import getProposals from "../api/getProposals.ts";

export default function useComputeProposals() {
    const [createdProposals, setCreatedProposals] = useState<Project[]>([]);
    const [submittedProposals, setSubmittedProposals] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { authData, loading: authLoading } = useAuthentication();
    const personId = authData.person?._id ?? null;

    const fetchProposals = useCallback(async () => {
        if (authLoading) {
            setLoading(true);
            return;
        }

        if (authData.oid === null && personId === null) {
            setCreatedProposals([]);
            setSubmittedProposals([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await getProposals();
            setCreatedProposals(data.created);
            setSubmittedProposals(data.submitted);
        } catch {
            setError("There was an error loading your compute proposals");
        } finally {
            setLoading(false);
        }
    }, [authData.oid, authLoading, personId]);

    useEffect(() => {
        fetchProposals();
    }, [fetchProposals]);

    return {
        createdProposals,
        submittedProposals,
        loading,
        error,
    };
}
