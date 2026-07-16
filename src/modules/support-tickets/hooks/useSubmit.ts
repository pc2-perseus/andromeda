import React from "react";
import { useShallow } from "zustand/react/shallow";
import { MAX_ATTACHMENT_SIZE_BYTES } from "../constants.ts";
import useAttachment from "./useAttachment.ts";
import useSubmitMutation from "./useSubmitMutation.ts";
import useValidate from "./useValidate.ts";
import { useTicketStore } from "../store/ticket.ts";

export default function useSubmit() {
    const { setAttachment } = useAttachment();
    const { validate, setValidationError, clearValidationError } =
        useValidate();
    const submitMutation = useSubmitMutation();
    const {
        subject,
        body,
        selectedProjectOid,
        selectedComputeProjectId,
        selectedServiceOid,
        jobIdInput,
        attachment,
    } = useTicketStore(
        useShallow((state) => ({
            subject: state.subject,
            body: state.body,
            selectedProjectOid: state.selectedProjectOid,
            selectedComputeProjectId: state.selectedComputeProjectId,
            selectedServiceOid: state.selectedServiceOid,
            jobIdInput: state.jobIdInput,
            attachment: state.attachment,
        }))
    );

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
        submitMutation.reset();

        const valid = await validate();
        if (!valid) {
            return;
        }

        try {
            await submitMutation.mutateAsync({
                payload: {
                    subject: subject.trim(),
                    body: body.trim(),
                    project_oid: selectedProjectOid || null,
                    compute_project_id: selectedComputeProjectId || null,
                    service_oids:
                        selectedServiceOid === "" ? [] : [selectedServiceOid],
                    job_id:
                        jobIdInput.trim() === ""
                            ? null
                            : Number.parseInt(jobIdInput.trim(), 10),
                },
                attachment,
            });
        } catch {
            // handled by mutation
        }
    }

    return {
        ...submitMutation,
        handleAttachmentChange,
        handleSubmit,
    };
}
