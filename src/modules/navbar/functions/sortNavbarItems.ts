import type { NavbarItem } from "../types/NavbarItem.ts";

export default function sortNavbarItems(item1: NavbarItem, item2: NavbarItem) {
    return (
        (item1.order === undefined ? Number.MAX_SAFE_INTEGER : item1.order) -
        (item2.order === undefined ? Number.MAX_SAFE_INTEGER : item2.order)
    );
}
