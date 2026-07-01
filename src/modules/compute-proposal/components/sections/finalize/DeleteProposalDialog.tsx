// React imports
import React from "react";

// MUI imports
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

// Custom imports
import deleteProposal from "../../../api/deleteProposal";

type Props = {
    open: boolean;
    proposalId: string;
    onClose: () => void;
    onDeleted?: () => void;
};

export default function DeleteProposalDialog({
    open,
    proposalId,
    onClose,
    onDeleted,
}: Props): React.ReactElement {
    const [isDeleting, setIsDeleting] = React.useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);

        const success = await deleteProposal(proposalId);

        setIsDeleting(false);
        onClose();

        if (success && onDeleted) {
            onDeleted();
        } else if (!success) {
            alert("Failed to delete proposal.");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Delete Proposal</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this proposal? This action
                    cannot be undone.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>

                <Button
                    onClick={handleDelete}
                    color="error"
                    variant="contained"
                    disabled={isDeleting}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
