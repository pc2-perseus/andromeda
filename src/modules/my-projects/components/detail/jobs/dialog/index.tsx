import React from "react";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography,
} from "@mui/material";
import type { Job } from "../../../../../../types/perseus/Job.ts";
import {
    formatDate,
    formatDurationMinutes,
    formatValue,
} from "../../../../../../utils/format.ts";
import ClusterChip from "../ClusterChip.tsx";
import StateIcon from "../StateIcon.tsx";
import Row from "./Row.tsx";

export default function DetailDialog({
    job,
    open,
    onClose,
}: {
    job: Job | null;
    open: boolean;
    onClose: () => void;
}): React.ReactElement {
    const submitted = job ? formatDate(job.submitted) : null;
    const start = job ? formatDate(job.start) : null;
    const end = job ? formatDate(job.end) : null;
    const timeLimit = job ? formatDurationMinutes(job.time_limit) : null;
    const nodes = job ? job.nodes.join(", ") : null;
    const allocatedResources = job !== null ? job.allocated_resources : null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Job Details</DialogTitle>

            <DialogContent dividers>
                {job === null ? null : (
                    <Box
                        component="table"
                        sx={{
                            width: "100%",
                            borderCollapse: "separate",
                            borderSpacing: "0 8px",
                        }}
                    >
                        <Box component="tbody">
                            <Row label="Job ID" value={job.job_id} />
                            <Row
                                label="Cluster Cockpit ID"
                                value={formatValue(job.cluster_cockpit_id)}
                            />
                            <Row
                                label="Name"
                                value={formatValue(job.job_name)}
                            />
                            <Row
                                label="State"
                                value={
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <StateIcon state={job.state} />
                                        <Typography>
                                            {formatValue(job.state)}
                                        </Typography>
                                    </Stack>
                                }
                            />
                            <Row
                                label="Reason"
                                value={formatValue(job.reason)}
                            />
                            <Row label="Project ID" value={job.project_oid} />
                            <Row
                                label="Compute Project"
                                value={
                                    <Chip
                                        label={job.compute_project_id}
                                        size="small"
                                    />
                                }
                            />
                            <Row label="User" value={formatValue(job.user)} />
                            <Row
                                label="Priority"
                                value={formatValue(job.priority_id)}
                            />
                            <Row label="Submitted" value={submitted ?? "-"} />
                            <Row label="Start" value={start ?? "-"} />
                            <Row label="End" value={end ?? "-"} />
                            <Row label="Time Limit" value={timeLimit ?? "-"} />
                            <Row
                                label="Cluster"
                                value={
                                    <ClusterChip clusterId={job.cluster_id} />
                                }
                            />
                            <Row
                                label="Partition"
                                value={
                                    job.partition ? (
                                        <Chip
                                            label={job.partition}
                                            size="small"
                                        />
                                    ) : (
                                        "-"
                                    )
                                }
                            />
                            <Row
                                label="Working Directory"
                                value={formatValue(job.working_directory)}
                            />
                            <Row label="Nodes" value={formatValue(nodes)} />
                            <Row
                                label="Resources"
                                value={
                                    allocatedResources !== null &&
                                    allocatedResources.length > 0 ? (
                                        <Stack spacing={0.5}>
                                            {allocatedResources.map(
                                                (resource) => (
                                                    <Typography key={resource}>
                                                        {resource}
                                                    </Typography>
                                                )
                                            )}
                                        </Stack>
                                    ) : (
                                        "-"
                                    )
                                }
                            />
                            <Row
                                label="Reservation"
                                value={formatValue(job.reservation)}
                            />
                        </Box>
                    </Box>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
