// React imports
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI imports
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Custom imports
import useDeleteProposalMutation from "../../../hooks/useDeleteProposalMutation.ts";

export default function DeleteButton(): React.ReactElement | null {
    const navigate = useNavigate();
    const { proposalId }: { proposalId?: string } = useParams();

    const [open, setOpen] = React.useState(false);
    const deleteMutation = useDeleteProposalMutation();

    if (!proposalId) {
        return null;
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            await deleteMutation.mutateAsync(proposalId);
            setOpen(false);
            navigate("/compute-proposal");
        } catch {
            alert("Failed to delete proposal.");
        }
    };

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleOpen}
            >
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> Delete Proposal </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this proposal? This
                        action cannot be undone.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleDelete}
                        color="error"
                        variant="contained"
                        disabled={deleteMutation.isPending}
                    >
                        {" "}
                        Delete{" "}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
