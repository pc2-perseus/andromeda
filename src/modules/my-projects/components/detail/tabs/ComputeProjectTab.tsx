import React from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import { TabPanel } from "@mui/lab";
import type { ComputeProject } from "../../../../../types/perseus/ComputeProject.ts";
import type { MyProject } from "../../../types/project.ts";
import UsageChart from "../usage-chart/index.tsx";
import ClusterResources from "../cluster-resources/index.tsx";
import JobTable from "../jobs/index.tsx";

export default function ComputeProjectTab({
    project,
    computeProject,
    showUserFilter,
}: {
    project: MyProject;
    computeProject: ComputeProject;
    showUserFilter: boolean;
}): React.ReactElement {
    return (
        <TabPanel
            value={computeProject.compute_project_id}
            sx={{ padding: 0, pt: 2 }}
        >
            <Stack spacing={2}>
                <Card>
                    <CardContent>
                        <Typography variant={"h5"}>
                            Resource Usage per Day
                        </Typography>
                        <UsageChart
                            sx={{ width: "100%" }}
                            project={project}
                            computeProject={computeProject}
                            showUserFilter={showUserFilter}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography variant={"h5"} sx={{ mb: 2 }}>
                            Jobs
                        </Typography>
                        <JobTable
                            project={project}
                            computeProjectId={computeProject.compute_project_id}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography variant={"h5"} sx={{ mb: 2 }}>
                            Cluster Resources
                        </Typography>
                        <ClusterResources
                            project={project}
                            computeProject={computeProject}
                        />
                    </CardContent>
                </Card>
            </Stack>
        </TabPanel>
    );
}
