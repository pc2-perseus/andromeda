import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.ts";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactElement;
}): React.ReactElement {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.validSession) {
        return (
            <Navigate
                to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`}
                replace
            />
        );
    }
    return children;
}
