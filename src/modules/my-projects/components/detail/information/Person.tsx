import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BadgeIcon from "@mui/icons-material/Badge";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";

export default function Person({
    title,
    email,
    personId,
    name,
    phone,
    homepage,
}: {
    title?: string | null;
    email?: string | null;
    personId?: string | null;
    name?: string | null;
    phone?: string | null;
    homepage?: string | null;
}): React.ReactElement {
    return (
        <Card sx={{ height: "100%" }}>
            <CardHeader title={title ?? "Not available"} />
            <CardContent sx={{ pt: 0 }}>
                <Stack spacing={1.25}>
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <BadgeIcon fontSize="small" />
                        <Typography variant="body2">
                            {name ?? "Not available"}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <AlternateEmailIcon fontSize="small" />
                        <Typography variant="body2">
                            {email ?? "Not available"}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <PhoneIcon fontSize="small" />
                        <Typography variant="body2">
                            {phone ?? "Not available"}
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <LanguageIcon fontSize="small" />
                        {homepage ? (
                            <Link
                                href={homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="body2"
                                sx={{ overflowWrap: "anywhere" }}
                            >
                                {homepage}
                            </Link>
                        ) : (
                            <Typography variant="body2">
                                Not available
                            </Typography>
                        )}
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                        ID: {personId ?? "Not available"}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
