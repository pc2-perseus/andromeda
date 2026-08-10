import React from "react";
import {
    Alert,
    Portal,
    Snackbar,
    type AlertColor,
    type SnackbarCloseReason,
} from "@mui/material";

export default function AutoHideSnackbar({
    children,
    severity,
}: {
    children: React.ReactNode;
    severity: AlertColor;
}): React.ReactElement {
    const [open, setOpen] = React.useState(true);

    return (
        <Portal>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={(_, reason?: SnackbarCloseReason) => {
                    if (reason !== "clickaway") {
                        setOpen(false);
                    }
                }}
            >
                <Alert severity={severity}>{children}</Alert>
            </Snackbar>
        </Portal>
    );
}
