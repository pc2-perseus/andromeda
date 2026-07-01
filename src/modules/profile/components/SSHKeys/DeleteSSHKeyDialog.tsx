import React from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

type Props = {
    open: boolean;
    keyName?: string;
    onClose: () => void;
    onConfirm: () => void;
};

export default function DeleteSSHKeyDialog({
    open,
    keyName,
    onClose,
    onConfirm,
}: Props): React.ReactElement {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete SSH key</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete the SSH key
                    {keyName ? ` "${keyName}"` : ""}? This action cannot be
                    undone.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>

                <Button color="error" variant="contained" onClick={onConfirm}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
