import type { NavbarItem } from "../types/NavbarItem.ts";

function validateItem(
    condition: undefined | "always" | "logged-in" | "logged-out",
    isLoggedIn: boolean
): boolean {
    return (
        condition === undefined ||
        condition === "always" ||
        (condition === "logged-in" && isLoggedIn) ||
        (condition === "logged-out" && !isLoggedIn)
    );
}

export default function filterNavbarItemsByAuthContext(
    items: NavbarItem[] | undefined,
    isLoggedIn: boolean
): NavbarItem[] {
    if (items === undefined) {
        return [];
    }
    const filteredItems: NavbarItem[] = [];

    items.forEach((item: NavbarItem) => {
        if (validateItem(item.condition, isLoggedIn)) {
            filteredItems.push({
                ...item,
                children: filterNavbarItemsByAuthContext(
                    item.children,
                    isLoggedIn
                ),
            });
        }
    });

    return filteredItems;
}
