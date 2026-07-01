import { useProjectStore } from "../store/project.ts";

export default () => {
    return useProjectStore((s) => s.reset);
};
