// React imports
import React from "react";

// MUI imports
import { Alert, AlertTitle, Dialog, Typography } from "@mui/material";

export default function SuccessDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}): React.ReactElement {
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <Alert icon={false} severity={"success"}>
                <AlertTitle>
                    <Typography variant="h4" component="div">
                        Submission successful
                    </Typography>
                </AlertTitle>
                You submission was successful, please click anywhere to go to
                your project overview.
            </Alert>
        </Dialog>
    );
}
