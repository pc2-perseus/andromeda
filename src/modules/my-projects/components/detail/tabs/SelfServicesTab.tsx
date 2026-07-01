import React from "react";
import { TabPanel } from "@mui/lab";
import SelfServices from "../self-services/index.tsx";

export default function SelfServicesTab({
    value,
}: {
    value: string;
}): React.ReactElement {
    return (
        <TabPanel value={value} sx={{ padding: 0, pt: 2 }}>
            <SelfServices />
        </TabPanel>
    );
}
