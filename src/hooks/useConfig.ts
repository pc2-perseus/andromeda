import useConfigQuery from "./useConfigQuery.ts";

export default function useConfig() {
    return useConfigQuery().data;
}
