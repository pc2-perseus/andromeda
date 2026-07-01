import type { NavbarItem } from "../navbar/types/NavbarItem.ts";

export const navbar: NavbarItem[] = [
    {
        title: "Support Tickets",
        order: 2,
        href: "/support-tickets",
        condition: "logged-in",
    },
];
