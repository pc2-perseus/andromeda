export default function isDarkModeActive(): boolean | null {
    if (localStorage.getItem("andromeda.isDarkMode") === null) {
        return null;
    } else {
        return localStorage.getItem("andromeda.isDarkMode") === "y";
    }
}

export function setDarkMode(active: boolean): void {
    localStorage.setItem("andromeda.isDarkMode", active ? "y" : "n");
}
