// React imports
import React from "react";

// MUI imports
import { Alert, Box } from "@mui/material";

// Custom imports
import type { Project } from "../../../../types/perseus/Project.ts";
import useComputeProposals from "../../hooks/useComputeProposals.ts";
import ListItem from "./ListItem.tsx";
import ListSkeleton from "./ListSkeleton.tsx";

export default function List(): React.ReactElement | null {
    const { createdProposals, submittedProposals, loading, error } =
        useComputeProposals();

    if (loading) {
        return <ListSkeleton />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (submittedProposals.length + createdProposals.length === 0) {
        return (
            <Alert severity="info">
                It looks like you have no compute proposals yet! You can create
                one above.
            </Alert>
        );
    }

    return (
        <Box>
            {submittedProposals.map((proposal: Project, index: number) => (
                <ListItem
                    key={proposal._id ?? index}
                    project={proposal}
                    href={`/compute-proposal/submitted/${proposal._id ?? ""}`}
                    state="submitted"
                    isEdge={
                        submittedProposals.length + createdProposals.length ===
                        1
                            ? "both"
                            : index === 0
                              ? "top"
                              : index + 1 === submittedProposals.length &&
                                  createdProposals.length === 0
                                ? "bottom"
                                : undefined
                    }
                />
            ))}
            {createdProposals.map((proposal: Project, index: number) => (
                <ListItem
                    key={proposal._id ?? index}
                    project={proposal}
                    href={`/compute-proposal/${proposal._id ?? "new"}`}
                    state="created"
                    isEdge={
                        submittedProposals.length + createdProposals.length ===
                        1
                            ? "both"
                            : index === 0 && submittedProposals.length === 0
                              ? "top"
                              : index + 1 === createdProposals.length
                                ? "bottom"
                                : undefined
                    }
                />
            ))}
        </Box>
    );
}
