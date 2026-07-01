// React imports
import React from "react";

// MUI imports
import { TextField } from "@mui/material";

// Custom imports
import useOtherInfo from "../../../hooks/useOtherInfo.ts";

export default function OtherInfo(): React.ReactElement {
    const [otherInfo, setOtherInfo] = useOtherInfo();

    return (
        <TextField
            label="Anything else you want us to know"
            multiline
            rows={3}
            value={otherInfo ?? ""}
            onChange={(e) => setOtherInfo(e.currentTarget.value)}
        />
    );
}
