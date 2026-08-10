import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.ts";
import { saveAuthRedirect } from "../utils/authRedirect.ts";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactElement;
}): React.ReactElement {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const redirectPath = location.pathname + location.search + location.hash;

    React.useEffect(() => {
        if (auth.validSession) {
            return;
        }

        saveAuthRedirect(redirectPath);

        navigate("/login");
    }, [navigate, auth.validSession, redirectPath]);

    if (!auth.validSession) {
        return <></>;
    }

    return children;
}
