import React from "react";

import { Box, Typography, Grid, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import type { SSHKey } from "../../../../types/perseus/SSHKey";
import DeleteSSHKeyDialog from "./DeleteSSHKeyDialog";

type Props = {
    keys: SSHKey[];
    onDelete: (id: string) => void;
};

export default function SSHKeysList({
    keys,
    onDelete,
}: Props): React.ReactElement {
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [selectedKey, setSelectedKey] = React.useState<SSHKey | null>(null);

    const centerCellStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };

    function openDeleteDialog(key: SSHKey) {
        setSelectedKey(key);
        setConfirmOpen(true);
    }

    function closeDeleteDialog() {
        setConfirmOpen(false);
        setSelectedKey(null);
    }

    function confirmDelete() {
        if (selectedKey) {
            onDelete(selectedKey._id);
        }
        closeDeleteDialog();
    }

    if (keys.length === 0) {
        return <Typography>No SSH public keys added yet.</Typography>;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* Header */}
            <Grid container spacing={2} sx={{ px: 2 }}>
                <Grid size={{ xs: 12, md: 2 }} sx={centerCellStyle}>
                    <Typography fontWeight="bold">Title</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} sx={centerCellStyle}>
                    <Typography fontWeight="bold">SSH public key</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 2 }} sx={centerCellStyle}>
                    <Typography fontWeight="bold">Created</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 2 }} sx={centerCellStyle}>
                    <Typography fontWeight="bold">Action</Typography>
                </Grid>
            </Grid>

            {keys.map((key) => (
                <Box
                    key={key._id}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        p: 2,
                    }}
                >
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, md: 2 }} sx={centerCellStyle}>
                            <Typography fontWeight="bold">
                                {key.name}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }} sx={centerCellStyle}>
                            <Typography
                                sx={{
                                    fontFamily: "monospace",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {key.pub_ssh_key}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 2 }} sx={centerCellStyle}>
                            <Typography variant="body2">
                                {new Date(key.created_at).toLocaleString()}
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, md: 2 }} sx={centerCellStyle}>
                            <IconButton
                                color="error"
                                size="small"
                                onClick={() => openDeleteDialog(key)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            ))}

            <DeleteSSHKeyDialog
                open={confirmOpen}
                keyName={selectedKey?.name}
                onClose={closeDeleteDialog}
                onConfirm={confirmDelete}
            />
        </Box>
    );
}
