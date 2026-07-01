import type { NavbarItem } from "../types/NavbarItem.ts";
import sortNavbarItems from "./sortNavbarItems.ts";

export default function mergeDuplicateNavbarItems(
    items: NavbarItem[]
): NavbarItem[] {
    const mergedItems: NavbarItem[] = [];
    items.forEach((item: NavbarItem) => {
        let wasMerged: boolean = false;
        for (let i: number = 0; i < mergedItems.length; i++) {
            if (
                item.title === mergedItems[i].title &&
                (item.href === mergedItems[i].href ||
                    mergedItems[i].href === "#") &&
                item.target === mergedItems[i].target
            ) {
                wasMerged = true;

                if (mergedItems[i].href === "#") {
                    mergedItems[i].href = item.href;
                }

                if (
                    mergedItems[i].order === undefined ||
                    (item.order !== undefined &&
                        item.order > (mergedItems[i].order as number))
                ) {
                    mergedItems[i].order = item.order;
                }

                if (mergedItems[i].children === undefined) {
                    mergedItems[i].children = [];
                }

                if (
                    [undefined, "always", "logged-out", "logged-in"].indexOf(
                        item.condition
                    ) <
                    [undefined, "always", "logged-out", "logged-in"].indexOf(
                        mergedItems[i].condition
                    )
                ) {
                    mergedItems[i].children?.forEach(
                        (child: NavbarItem) =>
                            (child.condition = mergedItems[i].condition)
                    );
                    mergedItems[i].condition = item.condition;
                } else if (item.children !== undefined) {
                    item.children?.forEach(
                        (child: NavbarItem) =>
                            (child.condition = item.condition)
                    );
                }

                if (item.children !== undefined) {
                    (mergedItems[i].children as NavbarItem[]).push(
                        ...item.children
                    );
                }

                mergedItems[i].children = mergeDuplicateNavbarItems(
                    mergedItems[i].children as NavbarItem[]
                ).sort(sortNavbarItems);
            }
        }

        if (!wasMerged) {
            mergedItems.push({ ...item });
        }
    });

    return mergedItems;
}
