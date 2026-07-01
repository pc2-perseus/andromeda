// React imports
import React from "react";

// MUI imports
import { Alert, AlertTitle, Dialog, Typography } from "@mui/material";

export default function ErrorDialog({
    error,
    onClose,
}: {
    error: string | null;
    onClose: () => void;
}): React.ReactElement {
    return (
        <Dialog open={Boolean(error)} onClose={onClose} maxWidth="md" fullWidth>
            <Alert icon={false} severity={"error"}>
                <AlertTitle>
                    <Typography variant="h4" component="div">
                        Submission failed
                    </Typography>
                </AlertTitle>
                {error}
            </Alert>
        </Dialog>
    );
}
