// React imports
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI imports
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    IconButton,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Custom imports
import type { Project } from "../../../../types/perseus/Project.ts";
import DeleteProposalDialog from "../sections/finalize/DeleteProposalDialog.tsx";

type ContentProps = {
    project: Project;
    state?: "created" | "submitted";
    onEdit?: () => void;
    onDelete?: () => void;
};

export default function ListItem({
    project,
    href,
    isEdge,
    state,
}: {
    project: Project;
    href: string;
    isEdge?: "top" | "bottom" | "both";
    state?: "created" | "submitted";
}): React.ReactElement {
    const navigate = useNavigate();
    const [deleteOpen, setDeleteOpen] = React.useState(false);

    const handleEdit = () => {
        navigate(href);
    };

    const handleDelete = () => {
        setDeleteOpen(true);
    };

    return (
        <Card
            variant="outlined"
            sx={{
                borderTopRightRadius:
                    isEdge === "top" || isEdge === "both" ? undefined : "0px",
                borderBottomRightRadius:
                    isEdge === "bottom" || isEdge === "both"
                        ? undefined
                        : "0px",
                borderBottom:
                    isEdge === "bottom" || isEdge === "both"
                        ? undefined
                        : "none",
            }}
        >
            {state === "submitted" ? (
                <CardActionArea onClick={() => navigate(href)}>
                    <Content
                        project={project}
                        state={state}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </CardActionArea>
            ) : (
                <Content
                    project={project}
                    state={state}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {project._id && (
                <DeleteProposalDialog
                    open={deleteOpen}
                    proposalId={project._id}
                    onClose={() => setDeleteOpen(false)}
                    onDeleted={() => window.location.reload()}
                />
            )}
        </Card>
    );
}

function Content({
    project,
    state,
    onEdit,
    onDelete,
}: ContentProps): React.ReactElement {
    return (
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
            <Box sx={{ display: "flex" }}>
                <Box
                    sx={{
                        writingMode: "vertical-lr",
                        transform: "scale(-1, -1)",
                        textAlign: "center",
                        fontSize: "19px",
                        px: 1,
                    }}
                >
                    {project.project_type ?? ""}
                </Box>

                <Box
                    sx={{
                        py: 1,
                        ml: 1,
                        flexGrow: 2,
                    }}
                >
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        {project.source === null
                            ? "source information unavailable"
                            : `#${project.source.foreign_id} ${
                                  project.source.name === "Andromeda"
                                      ? ""
                                      : `(${project.source.name})`
                              }`}
                    </Typography>

                    <Typography variant="h5">
                        {project.abbreviation ??
                            project.title ??
                            "no title or abbreviation available"}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        pt: "8px",
                        pr: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {state === "created" && (
                        <>
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit?.();
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>

                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete?.();
                                }}
                            >
                                <DeleteIcon fontSize="small" color="error" />
                            </IconButton>
                        </>
                    )}

                    {state === "submitted" && (
                        <Chip
                            label={
                                project.principal_investigator_id === null
                                    ? "PI acceptance pending"
                                    : project.person_of_contact_id === null
                                      ? "PC acceptance pending"
                                      : "submitted"
                            }
                            size="small"
                            color="primary"
                        />
                    )}
                </Box>
            </Box>
        </CardContent>
    );
}
