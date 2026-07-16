import type { NavbarItem } from "../types/NavbarItem.ts";
import type { GlobalConfiguration } from "../../../types/GlobalConfiguration.ts";

export default function filterEnabledNavbarItems(
    moduleNavbarItems: { [key: string]: NavbarItem[] },
    globalConfig: GlobalConfiguration
): NavbarItem[] {
    return Object.entries(moduleNavbarItems).flatMap(
        ([moduleId, items]: [string, NavbarItem[]]): NavbarItem[] =>
            globalConfig.enabled_modules.includes(moduleId) ? items : []
    );
}
