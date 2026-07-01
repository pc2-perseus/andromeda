import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import type { SSHKey } from "../../../../types/perseus/SSHKey";

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (name: string, key: string) => void;
    existingKeys: SSHKey[];
};

export default function SSHKeyModal({
    open,
    onClose,
    onSubmit,
    existingKeys,
}: Props): React.ReactElement {
    const [name, setName] = React.useState("");
    const [pubKey, setPubKey] = React.useState("");
    const [nameError, setNameError] = React.useState<string | null>(null);
    const [keyError, setKeyError] = React.useState<string | null>(null);

    function handleSubmit() {
        let valid = true;

        setNameError(null);
        setKeyError(null);

        if (!name) {
            setNameError("Name is required.");
            valid = false;
        }

        if (!pubKey) {
            setKeyError("Public key is required.");
            valid = false;
        } else {
            const SSH_KEY_REGEX =
                /^(ssh-(rsa|ed25519|dss)|ecdsa-sha2-nistp(256|384|521))\s+[A-Za-z0-9+/=]+\s*(.+)?$/;

            if (!SSH_KEY_REGEX.test(pubKey.trim())) {
                setKeyError("Invalid SSH public key format.");
                valid = false;
            }
        }

        const nameExists = existingKeys.some((k) => k.name === name);
        const keyExists = existingKeys.some((k) => k.pub_ssh_key === pubKey);

        if (nameExists) {
            setNameError("An SSH key with this name already exists.");
            valid = false;
        }

        if (keyExists) {
            setKeyError("This SSH public key is already registered.");
            valid = false;
        }

        if (!valid) return;

        onSubmit(name, pubKey);

        setName("");
        setPubKey("");
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Add a new SSH public key</DialogTitle>

            <DialogContent
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
                <Typography variant="body2">
                    Please note: Adding the key can take some time.
                </Typography>

                <TextField
                    label="Title"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (nameError) setNameError(null);
                    }}
                    fullWidth
                    error={!!nameError}
                    helperText={nameError}
                />

                <TextField
                    label="SSH public key"
                    value={pubKey}
                    onChange={(e) => {
                        setPubKey(e.target.value);
                        if (keyError) setKeyError(null);
                    }}
                    multiline
                    rows={4}
                    fullWidth
                    error={!!keyError}
                    helperText={keyError}
                />

                <Typography variant="body2">
                    <b>
                        Important: Please protect your SSH private key with a
                        strong password
                    </b>
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>

                <Button variant="contained" onClick={handleSubmit}>
                    Add SSH key
                </Button>
            </DialogActions>
        </Dialog>
    );
}
