export function validateOrcid(orcid: string | null | undefined): Error | null {
    if (!orcid) {
        return new Error("ORCID is required and cannot be empty.");
    }

    // 1. Clean the input (trim whitespace)
    const cleanedOrcid = orcid.trim();

    // 2. Structural Validation (Strict format: 0000-0000-0000-0000 where last char can be X)
    const orcidRegex = /^\d{4}-\d{4}-\d{4}-\d{3}[\dXx]$/;
    if (!orcidRegex.test(cleanedOrcid)) {
        return new Error(
            "Invalid ORCID format. Must be in the format: 0000-0000-0000-0000"
        );
    }

    // 3. Checksum Validation (ISO/IEC 7064:2003, MOD 11-2)
    // Remove hyphens to get the 16 characters
    const digits = cleanedOrcid.replace(/-/g, "");
    const baseDigits = digits.slice(0, 15); // First 15 digits
    const checkDigit = digits.charAt(15).toUpperCase(); // Last character (checksum)

    let total = 0;
    for (let i = 0; i < baseDigits.length; i++) {
        const digit = parseInt(baseDigits.charAt(i), 10);
        total = (total + digit) * 2;
    }

    const remainder = total % 11;
    const result = (12 - remainder) % 11;
    const expectedCheckDigit = result === 10 ? "X" : result.toString();

    if (checkDigit !== expectedCheckDigit) {
        return new Error(
            `Invalid ORCID checksum. Expected ending with "${expectedCheckDigit}", but got "${checkDigit}".`
        );
    }

    // If both structure and checksum pass, it is valid!
    return null;
}
