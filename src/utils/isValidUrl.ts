export default function isValidUrl(url: string): boolean {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return false;
    }
    try {
        const parsedUrl = new URL(url);
        return (
            parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:"
        );
    } catch {
        return false;
    }
}
