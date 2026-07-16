export default function formatNumber(value: number): string {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: value < 10 ? 2 : 0,
    }).format(value);
}
