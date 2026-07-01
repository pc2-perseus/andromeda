import * as yup from "yup";
import { MAX_ATTACHMENT_SIZE_BYTES } from "../constants.ts";

export const ticketSchema = yup.object({
    subject: yup.string().trim().required("A subject is required."),
    body: yup.string().trim().required("A description is required."),
    jobIdInput: yup
        .string()
        .trim()
        .matches(/^\d*$/, "Job IDs must be whole numbers."),
    attachment: yup
        .mixed<File>()
        .test(
            "file-size",
            "Attachments must be 25 MB or smaller.",
            (value) =>
                value === null ||
                value === undefined ||
                value.size <= MAX_ATTACHMENT_SIZE_BYTES
        )
        .nullable(),
});

export type TicketFormValues = yup.InferType<typeof ticketSchema>;
