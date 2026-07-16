// React imports
import React from "react";

// MUI imports
import { Alert, Link, Stack } from "@mui/material";

// Custom imports
import useComputeProjectsQuery from "../../hooks/useComputeProjectsQuery.ts";
import ListItem from "./ListItem.tsx";
import ListSkeleton from "./ListSkeleton.tsx";

export default function List(): React.ReactElement {
    const { data: projects, isPending, isError } = useComputeProjectsQuery();

    if (isPending) {
        return <ListSkeleton />;
    }

    if (isError) {
        return (
            <Alert severity="error">
                There was an error loading your projects
            </Alert>
        );
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
        <Stack spacing={1.5}>
            {projects.map((project) => (
                <ListItem
                    key={`${project.project_oid}-${project.compute_project_id}`}
                    project={project}
                />
            ))}
        </Stack>
    );
}
