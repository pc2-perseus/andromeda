// React imports
import React from "react";
import { useParams } from "react-router-dom";

// MUI imports
import { Box, type Theme, Typography } from "@mui/material";

// Custom imports
import parseMarkdown from "../../../../utils/parseMarkdown.ts";
import type { ModuleConfig } from "../../../../types/ModuleConfig.ts";
import getModuleConfig from "../../../../fundamental/getModuleConfig.ts";
import type { Resource } from "../../../../types/perseus/Resource.ts";
import sortResources from "../../../../utils/sortResources.ts";
import type { ResourceValue } from "../../../../types/perseus/ResourceValue.ts";
import type { ScientificField } from "../../../../types/perseus/ScientificField.ts";
import getItemName from "../../functions/getItemName.ts";
import resourceUnit from "../../../../utils/resourceUnit.ts";
import useComputeProposalQuery from "../../hooks/useComputeProposalQuery.ts";
import { useTheme } from "@mui/material/styles";
import DetailSkeleton from "./DetailSkeleton.tsx";
import useConfig from "../../../../hooks/useConfig.ts";
import useResources from "../../../../hooks/useResources.ts";

function SimpleTable({
    data,
}: {
    data: {
        [key: string]: string | number | React.ReactElement | null | undefined;
    };
}) {
    return (
        <table>
            <tbody>
                {Object.keys(data).map((key: string, index: number) => (
                    <tr key={index}>
                        <td style={{ verticalAlign: "top" }}>
                            <b>{key}:&nbsp;&nbsp;&nbsp;</b>
                        </td>
                        <td>
                            {(typeof data[key] === "string" &&
                            data[key].trim().length === 0
                                ? null
                                : data[key]) ?? <i>no data available</i>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default function ComputeProposalDetails(): React.ReactElement | null {
    const theme: Theme = useTheme();
    const { clusters, resources } = useResources();

    const config = useConfig();
    const moduleConfig: ModuleConfig | undefined = getModuleConfig(
        config,
        "compute-proposal"
    ) as ModuleConfig | undefined;

    const { proposalId }: { proposalId?: string } = useParams();
    const {
        data: project,
        isPending,
        isError,
    } = useComputeProposalQuery(proposalId ?? "");

    if (isError) {
        return null;
    }

    if (isPending || project === null || moduleConfig === undefined) {
        return (
            <DetailPageLayout theme={theme}>
                <DetailSkeleton />
            </DetailPageLayout>
        );
    }

    const sortedResources: Resource[] = sortResources(
        resources,
        clusters,
        project.project_type !== null &&
            project.project_type in moduleConfig.allowed_resources
            ? moduleConfig.allowed_resources[project.project_type]
            : []
    );

    const resourceTableData: {
        [key: string]: { [key: string]: string };
    } = {};

    sortedResources.forEach((resource: Resource) => {
        project.requested_resources
            .filter((rv: ResourceValue) => rv.resource_id === resource.id)
            .forEach((rv: ResourceValue) => {
                if (!(resource.cluster_id in resourceTableData)) {
                    resourceTableData[resource.cluster_id] = {};
                }
                const unit: {
                    unit: string;
                    unitFactor: number;
                } = resourceUnit(resource);
                resourceTableData[resource.cluster_id][
                    `${getItemName(resource, moduleConfig.alternative_names)}`
                ] = `${rv.value / unit.unitFactor}${unit.unit}`;
            });
    });

    const requestedResourceData = Object.fromEntries(
        Object.entries(resourceTableData).map(([clusterId, values]) => [
            getItemName(
                clusters.filter((c) => c.id === clusterId)[0],
                moduleConfig.alternative_names
            ),
            values,
        ])
    );

    const fundingTableData: string[] = [];

    if (project.custom_fields["funding"] !== undefined) {
        const fundingData: { [key: string]: string | null } = project
            .custom_fields["funding"] as { [key: string]: string | null };
        Object.keys(fundingData).forEach((key: string) => {
            if (key !== "other") {
                if (fundingData[key] !== null && !key.includes("$")) {
                    if (`${key}$org` in fundingData) {
                        fundingTableData.push(
                            `${key}, ${fundingData[`${key}$org`]} (${fundingData[key]})`
                        );
                    } else {
                        fundingTableData.push(`${key} (${fundingData[key]})`);
                    }
                }
            }
        });
    }

    return (
        <DetailPageLayout theme={theme}>
            <Typography variant="h2">General</Typography>
            <Box>
                <SimpleTable
                    data={{
                        "Proposal ID": project.source?.foreign_id,
                        Type: project.project_type,
                        Title: project.title,
                        Abbreviation: project.abbreviation,
                        "Follow-up project": project.source?.is_followup
                            ? "Yes"
                            : "No",
                        Start: project.start?.toLocaleDateString("de-DE", {
                            timeZone: "UTC",
                        }),
                        End: project.end?.toLocaleDateString("de-DE", {
                            timeZone: "UTC",
                        }),
                        Purpose: project.custom_fields["purpose"] as string,
                        Professorship: project.custom_fields[
                            "professorship"
                        ] as string,
                    }}
                />
            </Box>
            <Typography variant="h2" sx={{ mt: 3 }}>
                Scientific information
            </Typography>
            <Box>
                <SimpleTable
                    data={{
                        Abstract: (
                            <Box
                                sx={{
                                    "& p": {
                                        my: 0,
                                    },
                                }}
                            >
                                {parseMarkdown(project.description ?? "")}
                            </Box>
                        ),
                        "Scientific field(s)": (
                            <>
                                {project.scientific_fields.map(
                                    (sf: ScientificField, index: number) => (
                                        <React.Fragment
                                            key={sf.subject_id || index}
                                        >
                                            {index > 0 && <br />}
                                            {sf.subject_id} ({sf.name})
                                        </React.Fragment>
                                    )
                                )}
                            </>
                        ),
                        Software: project.custom_fields["software"] as string,
                        Funding: (
                            <>
                                {fundingTableData.map(
                                    (elem: string, index: number) => (
                                        <React.Fragment key={index}>
                                            {index > 0 && <br />}
                                            {elem}
                                        </React.Fragment>
                                    )
                                )}
                            </>
                        ),
                        "Further funding information":
                            project.custom_fields["funding"] !== undefined
                                ? (
                                      project.custom_fields["funding"] as {
                                          [key: string]: string;
                                      }
                                  )["other"]
                                : null,
                    }}
                />
            </Box>
            <Typography variant="h2" sx={{ mt: 3 }}>
                Requested resources
            </Typography>
            <Box>
                {Object.keys(requestedResourceData).map(
                    (clusterName: string, index: number) => (
                        <React.Fragment key={clusterName}>
                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 1,
                                    mt: index > 0 ? 4 : undefined,
                                }}
                            >
                                {clusterName}
                            </Typography>
                            <SimpleTable
                                data={requestedResourceData[clusterName]}
                            />
                        </React.Fragment>
                    )
                )}
            </Box>
            <Typography variant="h2" sx={{ mt: 3 }}>
                Public information
            </Typography>
            <Box>
                {project.custom_fields["public_approval"] &&
                project.custom_fields["additional_description"] ? (
                    <SimpleTable
                        data={{
                            "Publicly visible": "Yes",
                            "Public title": project.custom_fields[
                                "additional_description"
                            ]["public_title"] as string,
                            "Public description": project.custom_fields[
                                "additional_description"
                            ]["public_description"] as string,
                            "Additional links": (
                                <Box
                                    sx={{
                                        "& p": {
                                            my: 0,
                                        },
                                    }}
                                >
                                    {parseMarkdown(
                                        (
                                            project.custom_fields[
                                                "additional_description"
                                            ]["public_links"] as
                                                | string
                                                | undefined
                                        )?.replaceAll("\n", "<br />") ?? ""
                                    )}
                                </Box>
                            ),
                        }}
                    />
                ) : (
                    <SimpleTable
                        data={{
                            "Publicly visible": "No",
                            Reason: project.custom_fields.additional_description
                                ?.public_rejection_reason as string,
                        }}
                    />
                )}
            </Box>
            <Typography variant="h2" sx={{ mt: 3 }}>
                Finalize
            </Typography>
            <Box>
                <SimpleTable
                    data={{
                        Other: project.custom_fields["other"] as string,
                    }}
                />
            </Box>
        </DetailPageLayout>
    );
}

function DetailPageLayout({
    children,
    theme,
}: {
    children: React.ReactNode;
    theme: Theme;
}): React.ReactElement {
    return (
        <Box
            sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    py: 5,
                    width: "90vw",
                    maxWidth: `calc(${theme.breakpoints.values["md"]}px * 1.2)`,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
