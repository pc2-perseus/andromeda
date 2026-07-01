import useValidate from "./useValidate.ts";

export default function useValidationErrors(): { [key: string]: string } {
    return useValidate().errors;
}
