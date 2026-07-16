import React from "react";
import {
    Box,
    Divider,
    FormControlLabel,
    FormGroup,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import type { GroupedCumulativeResource } from "../../../../hooks/useGroupedCumulativeResources.ts";

export default function ClusterResourceSwitches({
    groupedResources,
    selectedResourceById,
    resourceColorById,
    handleToggleResource,
    handleToggleCluster,
}: {
    groupedResources: GroupedCumulativeResource[];
    selectedResourceById: Record<string, boolean>;
    resourceColorById: Map<string, string>;
    handleToggleResource: (resourceId: string) => void;
    handleToggleCluster: (clusterId: string) => void;
}): React.ReactElement {
    return (
        <Stack spacing={1.5}>
            {groupedResources.map((cluster, index) => {
                const allSelected = cluster.resources.every(
                    (resource) => selectedResourceById[resource.id]
                );

                return (
                    <Box key={cluster.id}>
                        {index > 0 ? <Divider sx={{ mb: 1.5 }} /> : null}

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={allSelected}
                                    onChange={() =>
                                        handleToggleCluster(cluster.id)
                                    }
                                />
                            }
                            label={
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                >
                                    {cluster.name}
                                </Typography>
                            }
                        />

                        <FormGroup row>
                            {cluster.resources.map((resource) => (
                                <FormControlLabel
                                    key={resource.id}
                                    sx={{ ml: 3 }}
                                    control={
                                        <Switch
                                            checked={Boolean(
                                                selectedResourceById[
                                                    resource.id
                                                ]
                                            )}
                                            onChange={() =>
                                                handleToggleResource(
                                                    resource.id
                                                )
                                            }
                                            sx={{
                                                "& .MuiSwitch-switchBase.Mui-checked":
                                                    {
                                                        color: resourceColorById.get(
                                                            resource.id
                                                        ),
                                                    },
                                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                                                    {
                                                        backgroundColor:
                                                            resourceColorById.get(
                                                                resource.id
                                                            ),
                                                    },
                                            }}
                                        />
                                    }
                                    label={resource.name}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                );
            })}
        </Stack>
    );
}
