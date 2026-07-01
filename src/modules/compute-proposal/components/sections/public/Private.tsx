// React imports
import React from "react";

// Custom imports
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import RejectionReason from "./RejectionReason.tsx";

export default function Private(): React.ReactElement | null {
    const config = useModuleConfig();

    if (!config) {
        return null;
    }

    return <RejectionReason />;
}
