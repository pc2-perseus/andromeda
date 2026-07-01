import React from "react";
import {
    Box,
    Card,
    ListItem as MuiListItem,
    ListItemAvatar,
    ListItemButton,
    Skeleton,
    Stack,
} from "@mui/material";

export default function ListSkeleton(): React.ReactElement {
    return (
        <Stack spacing={0}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Card
                    key={index}
                    variant="outlined"
                    sx={{
                        borderTopRightRadius: index === 0 ? undefined : "0px",
                        borderBottomRightRadius:
                            index === 4 ? undefined : "0px",
                        borderBottom: index === 4 ? undefined : "none",
                    }}
                >
                    <MuiListItem disablePadding>
                        <ListItemButton sx={{ gap: 1 }}>
                            <ListItemAvatar>
                                <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                />
                            </ListItemAvatar>

                            <Box sx={{ flexGrow: 1 }}>
                                <Skeleton variant="text" width="55%" />
                                <Skeleton variant="text" width="30%" />
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 0.5,
                                    flexWrap: "wrap",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Skeleton
                                    variant="rounded"
                                    width={70}
                                    height={24}
                                />
                                <Skeleton
                                    variant="rounded"
                                    width={90}
                                    height={24}
                                />
                            </Box>
                        </ListItemButton>

                        <Box sx={{ px: 1 }}>
                            <Skeleton
                                variant="circular"
                                width={32}
                                height={32}
                            />
                        </Box>
                    </MuiListItem>
                </Card>
            ))}
        </Stack>
    );
}
