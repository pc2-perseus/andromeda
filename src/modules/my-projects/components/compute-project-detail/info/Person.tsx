import React from "react";
import { Alert, Skeleton, Stack, Typography } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import type { Person as PersonType } from "../../../../../types/perseus/Person.ts";
import useResponsibleUsersQuery from "../../../hooks/useResponsibleUsersQuery.ts";

function personName(person: PersonType | null | undefined): string {
    if (!person) {
        return "Not available";
    }

    return [person.title, person.firstname, person.lastname]
        .filter(Boolean)
        .join(" ");
}

function PersonRow({
    icon,
    value,
}: {
    icon: React.ReactElement;
    value: string;
}): React.ReactElement {
    return (
        <Stack
            component="span"
            direction="row"
            spacing={0.75}
            alignItems="center"
            color="text.secondary"
        >
            {icon}
            <Typography component="span" variant="body2" color="text.secondary">
                {value}
            </Typography>
        </Stack>
    );
}

export default function Person({
    projectId,
    role,
}: {
    projectId: string;
    role: "principal_investigator" | "person_of_contact";
}): React.ReactElement {
    const {
        data: responsibleUsers,
        isPending,
        isError,
    } = useResponsibleUsersQuery(projectId);
    const person = responsibleUsers?.[role];

    if (isError) {
        return (
            <Alert severity="error">Responsible user could not be loaded</Alert>
        );
    }

    if (isPending) {
        return (
            <Stack spacing={0.75}>
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="48%" />
                <Skeleton variant="text" width="80%" />
            </Stack>
        );
    }

    return (
        <Stack component="span" spacing={0.5}>
            <PersonRow
                icon={<BadgeIcon fontSize="small" />}
                value={personName(person)}
            />
            <PersonRow
                icon={<AccountCircleIcon fontSize="small" />}
                value={person?.username ?? "No username"}
            />
            <PersonRow
                icon={<AlternateEmailIcon fontSize="small" />}
                value={person?.email ?? "No email"}
            />
        </Stack>
    );
}
