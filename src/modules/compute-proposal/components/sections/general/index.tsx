// React imports
import React from "react";

// MUI imports
import { Typography } from "@mui/material";

// Custom imports
import ProjectType from "./ProjectType.tsx";
import ProjectTitle from "./ProjectTitle.tsx";
import FollowUp from "./FollowUp.tsx";
import Predecessor from "./Predecessor.tsx";
import Abbreviation from "./Abbreviation.tsx";
import Purpose from "./Purpose.tsx";
import Professorship from "./Professorship.tsx";
import StartDate from "./StartDate.tsx";
import EndDate from "./EndDate.tsx";

export default function SecGeneral(): React.ReactElement | null {
    return (
        <>
            <Typography variant="h2">General information</Typography>
            <ProjectType />
            <ProjectTitle />
            <FollowUp />
            <Predecessor />
            <Abbreviation />
            <Purpose />
            <Professorship />
            <StartDate />
            <EndDate />
        </>
    );
}
