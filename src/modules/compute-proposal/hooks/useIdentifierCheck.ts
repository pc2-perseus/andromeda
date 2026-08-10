import React from "react";

const DEBOUNCE_MS = 1000;
const REQUEST_TIMEOUT_MS = 10000;

type UseIdentifierCheckArgs = {
    identifier: string;
    identifierLinkPrefix?: string;
    enabled: boolean;
};

export default function useIdentifierCheck({
    identifier,
    identifierLinkPrefix,
    enabled,
}: UseIdentifierCheckArgs) {
    const [isChecking, setIsChecking] = React.useState(false);
    const [result, setResult] = React.useState<boolean | null>(null);
    const canCheck =
        enabled && Boolean(identifierLinkPrefix) && identifier.length > 0;

    const debounceTimeoutRef = React.useRef<number | null>(null);
    const abortControllerRef = React.useRef<AbortController | null>(null);

    const checkIdentifier = React.useCallback(async () => {
        if (!canCheck || !identifierLinkPrefix) {
            setIsChecking(false);
            setResult(null);
            return;
        }

        abortControllerRef.current?.abort();

        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsChecking(true);
        setResult(null);

        const timeoutId = window.setTimeout(() => {
            controller.abort();
        }, REQUEST_TIMEOUT_MS);

        try {
            const response = await fetch(
                `${identifierLinkPrefix}${identifier}`,
                {
                    method: "GET",
                    signal: controller.signal,
                }
            );

            setResult(response.ok);
        } catch {
            setResult(false);
        } finally {
            window.clearTimeout(timeoutId);

            if (abortControllerRef.current === controller) {
                abortControllerRef.current = null;
            }

            setIsChecking(false);
        }
    }, [canCheck, identifier, identifierLinkPrefix]);

    React.useEffect(() => {
        if (!canCheck) {
            return;
        }

        if (debounceTimeoutRef.current !== null) {
            window.clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = window.setTimeout(() => {
            void checkIdentifier();
        }, DEBOUNCE_MS);

        return () => {
            if (debounceTimeoutRef.current !== null) {
                window.clearTimeout(debounceTimeoutRef.current);
                debounceTimeoutRef.current = null;
            }

            abortControllerRef.current?.abort();
        };
    }, [canCheck, checkIdentifier]);

    return {
        checkingIdentifier: canCheck ? isChecking : false,
        identifierCheckResult: canCheck ? result : null,
    };
}
