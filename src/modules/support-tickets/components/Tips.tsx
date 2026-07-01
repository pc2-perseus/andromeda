import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

export default function Tips(): React.ReactElement {
    return (
        <Paper variant="outlined" sx={{ p: 3 }}>
            <Stack spacing={2}>
                <Typography variant="h6" component="h2">
                    The following tips are important:
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 3 }}>
                    <li>
                        Open a new ticket for new issues. Replying to an already
                        existing ticket will append to it. New issues need to
                        have their own, new ticket.
                    </li>
                    <li>
                        Provide a descriptive subject line, succinctly
                        summarizing the problem. Something like "HPC problems"
                        is NOT very useful to us.
                    </li>
                    <li>
                        Please do NOT attach files already available on the
                        cluster (e.g. log files) or copy their contents in the
                        body of the message. Just provide the paths to the files
                        on the system. If you plan to submit the job again with
                        a slightly modified version of the file, please copy it
                        and give us the name that you copied it to.
                    </li>
                    <li>
                        If you are reporting what seem to be problems with your
                        jobs being stuck in the pending state in the queue, do
                        NOT delete the jobs unless we tell you to do so.
                        Deleting the jobs makes it harder to diagnose the
                        problems.
                    </li>
                    <li>
                        If you are having connection issues, please include the
                        exact command you are running, the host you are trying
                        to connect to, the username you are using (DO NOT
                        INCLUDE PASSWORDS), the approximate time of the failed
                        attempts (as accurately as you can), and if possible the
                        IP address of the machine you are trying to connect
                        from.
                    </li>
                    <li>
                        If possible, how can we reproduce the error in a
                        systematic manner? Did you attempt to fix/troubleshoot
                        the problem?
                    </li>
                    <li>
                        If your job is not queued, please name the path to the
                        job script and how you called it.
                    </li>
                </Box>
            </Stack>
        </Paper>
    );
}
