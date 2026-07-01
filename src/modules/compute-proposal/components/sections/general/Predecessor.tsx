// React imports
import React from "react";

// MUI imports
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

// Custom imports
import InfoInput from "../../../../../components/InfoInput.tsx";
import getProjectsOverview from "../../../api/getProjectsOverview.ts";
import useIsFollowUp from "../../../hooks/useIsFollowUp.ts";
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import usePredecessorId from "../../../hooks/usePredecessorId.ts";
import useValidationErrors from "../../../hooks/useValidationErrors.ts";

export default function Predecessor(): React.ReactElement | null {
    const config = useModuleConfig();
    const errors = useValidationErrors();

    const [isFollowUp] = useIsFollowUp();
    const [predecessorId, setPredecessorId] = usePredecessorId();
    const [possiblePredecessors, setPossiblePredecessors] = React.useState<
        {
            _id: string;
            abbreviation: string | null;
            title: string | null;
        }[]
    >([]);

    React.useEffect(() => {
        if (!isFollowUp) {
            return;
        }

        getProjectsOverview().then((data) => {
            setPossiblePredecessors(data);
        });
    }, [isFollowUp]);

    if (!config || !isFollowUp) {
        return null;
    }

    return (
        <InfoInput infoText={config.info_texts.predecessor}>
            <FormControl
                error={"source.predecessor_id" in errors}
                required
                fullWidth
            >
                <InputLabel>Predecessor project</InputLabel>
                <Select
                    label="Predecessor project"
                    value={predecessorId ?? ""}
                    onChange={(e) => setPredecessorId(e.target.value)}
                >
                    {possiblePredecessors.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                            {item.abbreviation ??
                                item.title ??
                                "no title or abbreviation available"}
                        </MenuItem>
                    ))}
                </Select>
                {"source.predecessor_id" in errors && (
                    <FormHelperText>
                        {errors["source.predecessor_id"]}
                    </FormHelperText>
                )}
            </FormControl>
        </InfoInput>
    );
}
