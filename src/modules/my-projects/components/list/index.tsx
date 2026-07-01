// React imports
import React from "react";

// MUI imports
import { Alert, Box, Link } from "@mui/material";

// Custom imports
import useMyProjects from "../../hooks/useMyProjects.ts";
import ListItem from "./ListItem.tsx";
import ListSkeleton from "./ListSkeleton.tsx";

export default function List(): React.ReactElement {
    const { projects, loading, error } = useMyProjects();

    if (loading) {
        return <ListSkeleton />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (projects.length === 0) {
        return (
            <Alert severity="info">
                It looks like you have no projects yet! You can{" "}
                <Link href={"/compute-proposal/new"}>
                    submit a proposal here
                </Link>{" "}
                and wait for approval.
            </Alert>
        );
    }

    return (
        <Box>
            {projects.map((project, index) => (
                <ListItem
                    key={project._id}
                    project={project}
                    isEdge={
                        projects.length === 1
                            ? "both"
                            : index === 0
                              ? "top"
                              : index === projects.length - 1
                                ? "bottom"
                                : undefined
                    }
                />
            ))}
        </Box>
    );
}
