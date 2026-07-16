import React from "react";

import { Alert, Box, Button, Typography } from "@mui/material";

import SSHKeysList from "./SSHKeyList";
import SSHKeyModal from "./SSHKeysModal";
import SSHKeysSkeleton from "./SSHKeysSkeleton";
import useSshKeysQuery from "../../hooks/useSshKeysQuery.ts";
import useAddSshKeyMutation from "../../hooks/useAddSshKeyMutation.ts";
import useDeleteSshKeyMutation from "../../hooks/useDeleteSshKeyMutation.ts";

export default function SSHKeys(): React.ReactElement {
    const [modalOpen, setModalOpen] = React.useState(false);

    const { data: keys, isPending, isError } = useSshKeysQuery();
    const addMutation = useAddSshKeyMutation();
    const deleteMutation = useDeleteSshKeyMutation();

    if (isPending) {
        return <SSHKeysSkeleton />;
    }

    if (isError) {
        return (
            <Alert severity="error">
                There was an error loading your SSH keys.
            </Alert>
        );
    }

    async function handleAdd(name: string, pubKey: string) {
        if (!keys) {
            return;
        }

        const nameExists = keys.some((k) => k.name === name);
        const keyExists = keys.some((k) => k.pub_ssh_key === pubKey);

        if (nameExists || keyExists) {
            return;
        }

        try {
            await addMutation.mutateAsync({ name, pubSshKey: pubKey });
            setModalOpen(false);
        } catch {
            // Error shown below.
        }
    }

    async function handleDelete(id: string) {
        try {
            await deleteMutation.mutateAsync(id);
        } catch {
            // Error shown below.
        }
    }

    return (
        <React.Fragment>
            {/* Header with Add button */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Typography variant="h4">SSH public keys</Typography>

                <Button
                    variant="contained"
                    size="small"
                    onClick={() => setModalOpen(true)}
                >
                    Add SSH public key
                </Button>
            </Box>

            {addMutation.isError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    There was an error adding your SSH key.
                </Alert>
            )}

            {deleteMutation.isError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    There was an error deleting your SSH key.
                </Alert>
            )}

            {/* If no keys */}
            {keys.length === 0 ? (
                <Typography>No SSH public keys added yet.</Typography>
            ) : (
                <SSHKeysList keys={keys} onDelete={handleDelete} />
            )}

            {/* Modal */}
            <SSHKeyModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleAdd}
                existingKeys={keys}
            />
        </React.Fragment>
    );
}
