// React imports
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI imports
import { Button, type ButtonProps, CircularProgress } from "@mui/material";

// Icon imports
import Icon from "@mui/icons-material/Save";

// Custom imports
import useSave from "../../../hooks/useSave.ts";
import useAutosave from "../../../hooks/useAutosave.ts";
import useId from "../../../hooks/useId.ts";

export default function SaveButton({
    ...props
}: ButtonProps): React.ReactElement {
    const [id] = useId();
    const { save, isSaving } = useSave();
    const navigate = useNavigate();

    useAutosave();

    return (
        <Button
            variant="outlined"
            onClick={async () => {
                const result = await save();
                if (result !== null) {
                    navigate("/compute-proposal");
                }
            }}
            disabled={isSaving || !id}
            {...props}
        >
            {isSaving ? (
                <CircularProgress size={16} color="inherit" />
            ) : (
                <Icon />
            )}{" "}
            Save &amp; Close
        </Button>
    );
}
