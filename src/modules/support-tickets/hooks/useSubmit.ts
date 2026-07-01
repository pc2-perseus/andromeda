import React from "react";
import { MAX_ATTACHMENT_SIZE_BYTES } from "../constants.ts";
import useAttachment from "./useAttachment.ts";
import useSubmitState from "./useSubmitState.ts";
import useValidate from "./useValidate.ts";

export default function useSubmit(): {
    handleAttachmentChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
} {
    const { setAttachment } = useAttachment();
    const { submit } = useSubmitState();
    const { setValidationError, clearValidationError } = useValidate();

    function handleAttachmentChange(
        event: React.ChangeEvent<HTMLInputElement>
    ): void {
        const nextAttachment = event.target.files?.[0] ?? null;

        if (
            nextAttachment !== null &&
            nextAttachment.size > MAX_ATTACHMENT_SIZE_BYTES
        ) {
            setAttachment(null);
            setValidationError(
                "attachment",
                "Attachments must be 25 MB or smaller."
            );
            return;
        }

        setAttachment(nextAttachment);
        clearValidationError("attachment");
    }

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        await submit();
    }

    return {
        handleAttachmentChange,
        handleSubmit,
    };
}
