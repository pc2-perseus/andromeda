// React imports
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// MUI imports
import { Box } from "@mui/material";

// Custom imports
import CONFIG from "../../config.ts";
import LoginForm from "./components/Form.tsx";
import useAuth from "../../hooks/useAuth.ts";

export default function Login({
    next = undefined,
}: {
    next?: string;
}): React.ReactElement {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const auth = useAuth();

    // Redirect if logged in
    React.useEffect(() => {
        if (!auth.validSession) {
            return;
        }

        navigate(next ?? searchParams.get("next") ?? "/");
    }, [auth.validSession, navigate, next, searchParams]);

    function handleLoginRedirect(identifier?: string) {
        const nextUrl = next ?? searchParams.get("next") ?? "/";

        window.location.href = identifier
            ? `${CONFIG.GATEWAY_URL}/auth/login?kc_idp_hint=${identifier}&next=${encodeURIComponent(nextUrl)}`
            : `${CONFIG.GATEWAY_URL}/auth/login?next=${encodeURIComponent(nextUrl)}`;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "center",
                p: 5,
            }}
        >
            <LoginForm onPressLoginOption={handleLoginRedirect} />
        </Box>
    );
}
