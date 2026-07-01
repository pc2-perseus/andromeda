// React imports
import React from "react";

// Custom imports
import useModuleConfig from "../../../hooks/useModuleConfig.ts";
import Title from "./Title.tsx";
import Description from "./Description.tsx";
import Links from "./Links.tsx";

export default function Public(): React.ReactElement | null {
    const config = useModuleConfig();

    if (!config) {
        return null;
    }

    return (
        <>
            <Title />
            <Description />
            <Links />
        </>
    );
}
