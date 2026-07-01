import useValidate from "./useValidate.ts";

export default (): { [key: string]: string } => {
    return useValidate().errors;
};
