// React imports
import React from "react";
import { useNavigate } from "react-router-dom";

// MUI imports
import { Box } from "@mui/material";

// Custom imports
import CONFIG from "../../config.ts";
import LoginForm from "./components/Form.tsx";
import useAuth from "../../hooks/useAuth.ts";
import { consumeAuthRedirect } from "../../utils/authRedirect.ts";

export default function Login(): React.ReactElement {
    const navigate = useNavigate();
    const auth = useAuth();
    const didRedirect = React.useRef(false);

    // Redirect if logged in
    React.useEffect(() => {
        if (!auth.validSession || didRedirect.current) {
            return;
        }

        didRedirect.current = true;
        navigate(consumeAuthRedirect() ?? "/my-projects");
    }, [auth.validSession, navigate]);

    function handleLoginRedirect(identifier?: string) {
        window.location.href = identifier
            ? `${CONFIG.GATEWAY_URL}/auth/login?kc_idp_hint=${identifier}`
            : `${CONFIG.GATEWAY_URL}/auth/login`;
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
