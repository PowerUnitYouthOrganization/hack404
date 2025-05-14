/**
 * Checks if the email domain has valid MX records
 * @param email The email address to check
 * @returns Promise<boolean> True if the domain has MX records
 */
export async function domainHasMX(email: string): Promise<boolean> {
  if (!isValidEmailFormat(email)) {
    return false;
  }

  try {
    const domain = email.split("@")[1];
    // Using DNS module to check for MX records
    const { promises: dns } = require("dns");

    try {
      // Check if the domain has MX records
      const mxRecords = await dns.resolveMx(domain);
      return Array.isArray(mxRecords) && mxRecords.length > 0;
    } catch (error) {
      // If MX lookup fails, try A records as a fallback
      // Some valid domains use A records instead of MX
      try {
        const aRecords = await dns.resolve4(domain);
        return Array.isArray(aRecords) && aRecords.length > 0;
      } catch {
        return false; // Both MX and A record lookups failed
      }
    }
  } catch (error) {
    console.error("Error checking MX records:", error);
    return false;
  }
}

/**
 * Basic email format validation
 * @param email The email address to validate
 * @returns boolean True if the email format is valid
 */
export function isValidEmailFormat(email: string): boolean {
  // Basic email format check - just needs @ and something on both sides
  return (
    typeof email === "string" &&
    email.includes("@") &&
    email.split("@")[0].length > 0 &&
    email.split("@")[1].length > 0
  );
}
