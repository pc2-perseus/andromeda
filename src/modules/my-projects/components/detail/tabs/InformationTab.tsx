import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { TabPanel } from "@mui/lab";
import type { MyProject } from "../../../types/project.ts";
import InformationList from "../information/List.tsx";
import PrincipalInvestigator from "../information/PrincipalInvestigator.tsx";
import PersonOfContact from "../information/PersonOfContact.tsx";

export default function InformationTab({
    project,
    value,
}: {
    project: MyProject;
    value: string;
}): React.ReactElement {
    return (
        <TabPanel value={value} sx={{ padding: 0, pt: 2 }}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography component="div" variant={"h5"}>
                                Information
                            </Typography>
                            <InformationList project={project} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography component="div" variant={"h5"}>
                                Description
                            </Typography>
                            <Typography variant={"body1"}>
                                {project.description ??
                                    "No description available"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <PrincipalInvestigator project={project} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <PersonOfContact project={project} />
                </Grid>
            </Grid>
        </TabPanel>
    );
}
