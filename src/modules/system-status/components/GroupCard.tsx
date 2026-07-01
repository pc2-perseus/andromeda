import React from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import type {
    SystemStatusGroup,
    SystemStatusServiceItem,
} from "../types/SystemStatusGroup.ts";
import DetailDialog from "./DetailDialog.tsx";
import GroupCardEntry from "./GroupCardEntry.tsx";

export default function GroupCard({
    group,
}: {
    group: SystemStatusGroup;
}): React.ReactElement {
    const [selectedService, setSelectedService] =
        React.useState<SystemStatusServiceItem | null>(null);

    return (
        <>
            <Card sx={{ height: "100%" }}>
                <CardContent
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                        {group.title}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                        }}
                    >
                        {group.services.map(
                            (
                                serviceItem: SystemStatusServiceItem,
                                index: number
                            ) => {
                                return (
                                    <React.Fragment
                                        key={serviceItem.service._id ?? index}
                                    >
                                        {index > 0 && <Divider />}
                                        <GroupCardEntry
                                            serviceItem={serviceItem}
                                            onClick={() =>
                                                setSelectedService(serviceItem)
                                            }
                                        />
                                    </React.Fragment>
                                );
                            }
                        )}
                    </Box>
                </CardContent>
            </Card>
            <DetailDialog
                open={selectedService !== null}
                groupTitle={group.title}
                serviceItem={selectedService}
                onClose={() => setSelectedService(null)}
            />
        </>
    );
}
