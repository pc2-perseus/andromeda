// React imports
import React, { useEffect } from "react";

// MUI imports
import { Switch, type SwitchProps, Tooltip } from "@mui/material";

// Custom imports
import type { Cluster } from "../../../../../types/perseus/Cluster.ts";
import useClusterIsSelected from "../../../hooks/useClusterIsSelected.ts";
import useClusterMustBeSelected from "../../../hooks/useClusterMustBeSelected.ts";
import useClusterHasResourceError from "../../../hooks/useClusterHasResourceError.ts";

export default function ClusterSwitch({
    cluster,
}: {
    cluster: Cluster;
} & SwitchProps): React.ReactElement | null {
    const mustBeSelected = useClusterMustBeSelected(cluster);
    const [selected, setSelected] = useClusterIsSelected(cluster);
    const hasResourceError = useClusterHasResourceError(cluster);

    const style =
        !selected && hasResourceError
            ? {
                  "& .MuiSwitch-switchBase": {
                      color: "error.main",
                  },
                  "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                      backgroundColor: "error.main",
                      opacity: 0.4,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "error.main",
                      opacity: 0.6,
                  },
                  "& .MuiSwitch-switchBase.Mui-disabled": {
                      color: "error.main",
                  },
                  "& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track": {
                      backgroundColor: "error.main",
                      opacity: 0.3,
                  },
              }
            : undefined;

    // select the cluster if it must be selected but is not selected
    useEffect(() => {
        if (mustBeSelected && !selected) {
            setSelected(true);
        }
    }, [mustBeSelected, selected, setSelected]);

    if (mustBeSelected) {
        return (
            <Tooltip
                title="This part requires mandatory resources and cannot be deselected"
                placement="top"
                arrow
            >
                <span>
                    <Switch checked disabled sx={style} />
                </span>
            </Tooltip>
        );
    }

    return (
        <Switch
            checked={selected}
            onChange={(e) => setSelected(e.currentTarget.checked)}
            sx={style}
        />
    );
}
