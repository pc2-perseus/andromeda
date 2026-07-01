import type { NavbarItem } from "../navbar/types/NavbarItem.ts";

export const navbar: NavbarItem[] = [
    {
        title: "My projects",
        order: 1,
        href: "/my-projects",
        condition: "logged-in",
        children: [
            {
                title: "My projects",
                order: 1,
                href: "/my-projects",
                condition: "logged-in",
            },
        ],
    },
];
