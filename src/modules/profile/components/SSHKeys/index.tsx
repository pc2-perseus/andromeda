import React from "react";

import { Box, Typography, Button } from "@mui/material";

import { getSSHKeys, addSSHKey, deleteSSHKey } from "../../api/sshKeys";
import type { SSHKey } from "../../../../types/perseus/SSHKey";
import SSHKeysList from "./SSHKeyList";
import SSHKeyModal from "./SSHKeysModal";

export default function SSHKeys(): React.ReactElement {
    const [keys, setKeys] = React.useState<SSHKey[]>([]);
    const [modalOpen, setModalOpen] = React.useState(false);

    async function loadKeys() {
        const data = await getSSHKeys();
        setKeys(data);
    }

    React.useEffect(() => {
        loadKeys();
    }, []);

    async function handleAdd(name: string, pubKey: string) {
        const nameExists = keys.some((k) => k.name === name);
        const keyExists = keys.some((k) => k.pub_ssh_key === pubKey);

        if (nameExists || keyExists) {
            return;
        }

        const success = await addSSHKey(name, pubKey);

        if (success) {
            await loadKeys();
            setModalOpen(false);
        }
    }

    async function handleDelete(id: string) {
        const success = await deleteSSHKey(id);

        if (success) {
            await loadKeys();
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
