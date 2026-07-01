export default function commaSeperatedList(
    list: string[],
    lastSeperator: string = "and"
): string {
    const copyList: string[] = [...list];
    if (copyList.length <= 1) {
        return list.join(", ");
    }
    const lastItem: string | undefined = copyList.pop();
    return `${copyList.join(", ")} ${lastSeperator} ${lastItem}`;
}
