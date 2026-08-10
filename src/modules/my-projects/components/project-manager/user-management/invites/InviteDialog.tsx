import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";

import type { ComputeProject } from "../../../../../../types/perseus/ComputeProject.ts";
import ProjectSelector from "./ProjectSelector.tsx";

export default function InviteDialog({
    open,
    computeProjects,
    loading,
    onClose,
    onInvite,
}: {
    open: boolean;
    computeProjects: ComputeProject[];
    loading: boolean;
    onClose: () => void;
    onInvite: (email: string, computeProjectId: string) => Promise<void>;
}): React.ReactElement {
    const fallbackComputeProjectId =
        computeProjects[0]?.compute_project_id ?? "";
    const [email, setEmail] = React.useState("");
    const [computeProjectId, setComputeProjectId] = React.useState("");
    const selectedComputeProjectId =
        computeProjectId || fallbackComputeProjectId;

    function close() {
        setEmail("");
        setComputeProjectId("");
        onClose();
    }

    async function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !selectedComputeProjectId) {
            return;
        }

        try {
            await onInvite(normalizedEmail, selectedComputeProjectId);
            close();
        } catch {
            // The owning component shows the local error message.
        }
    }

    return (
        <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
            <DialogTitle>Invite user</DialogTitle>
            <Stack component="form" onSubmit={(event) => void submit(event)}>
                <DialogContent dividers>
                    <Stack spacing={2}>
                        <TextField
                            label="Email address"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            fullWidth
                        />
                        <ProjectSelector
                            value={selectedComputeProjectId}
                            label="Compute project"
                            computeProjects={computeProjects}
                            onChange={setComputeProjectId}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !selectedComputeProjectId}
                    >
                        Invite
                    </Button>
                </DialogActions>
            </Stack>
        </Dialog>
    );
}
