import { useProjectStore } from "../store/project.ts";
import { useShallow } from "zustand/react/shallow";

export default (): [string | null, (value: string | null) => void] => {
    const { value, set } = useProjectStore(
        useShallow((state) => ({
            value: state.project.custom_fields.pi_email as string | null,
            set: state.setPrincipalInvestigatorEmail,
        }))
    );

    return [value, set];
};
