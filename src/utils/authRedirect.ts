const AUTH_REDIRECT_STORAGE_KEY = "andromeda.authRedirect";

export function getInternalRedirectPath(value: string | null): string | null {
    if (value === null) {
        return null;
    }

    if (!value.startsWith("/") || value.startsWith("//")) {
        return null;
    }

    return value;
}

export function saveAuthRedirect(value: string | null): void {
    const redirectPath = getInternalRedirectPath(value);

    if (redirectPath === null || typeof window === "undefined") {
        return;
    }

    window.sessionStorage.setItem(AUTH_REDIRECT_STORAGE_KEY, redirectPath);
}

export function consumeAuthRedirect(): string | null {
    if (typeof window === "undefined") {
        return null;
    }

    const redirectPath = getInternalRedirectPath(
        window.sessionStorage.getItem(AUTH_REDIRECT_STORAGE_KEY)
    );

    window.sessionStorage.removeItem(AUTH_REDIRECT_STORAGE_KEY);

    return redirectPath;
}
