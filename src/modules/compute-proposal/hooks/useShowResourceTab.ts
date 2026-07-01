import { useProjectStore } from "../store/project.ts";

export default (): string | boolean => {
    return useProjectStore((state) => state.showResourceTab());
};
