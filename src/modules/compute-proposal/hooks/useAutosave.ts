import { useCallback, useEffect, useRef } from "react";
import useSave from "./useSave";
import useProject from "./useProject";

export default function useAutosave() {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isSavingRef = useRef(false);

    const project = useProject();
    const { save, isSaving } = useSave();

    useEffect(() => {
        isSavingRef.current = isSaving;
    }, [isSaving]);

    const saveCall = useCallback(async () => {
        if (isSavingRef.current) return;
        await save();
    }, [save]);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            void saveCall();
        }, 5000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [project, saveCall]);

    useEffect(() => {
        const handlePageHide = () => {
            // not guaranteed, some browsers terminate network calls on page hide
            void saveCall();
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                void saveCall();
            }
        };

        window.addEventListener("pagehide", handlePageHide);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("pagehide", handlePageHide);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [saveCall]);
}
