import type { NavbarItem } from "../types/NavbarItem.ts";

export default function getModuleNavbarItems(
    navbarFiles: Record<string, { navbar: NavbarItem[] }>
): { [key: string]: NavbarItem[] } {
    const moduleNavbarItems: { [key: string]: NavbarItem[] } = {};

    for (const [path, mod] of Object.entries(navbarFiles)) {
        const match: RegExpMatchArray | null = path.match(/\..\/([^/]+)\//);
        if (match !== null) {
            moduleNavbarItems[match[1]] = mod.navbar;
        }
    }

    return moduleNavbarItems;
}
