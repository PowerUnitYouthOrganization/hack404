/**
 * Simplified email domain check - now just uses basic validation
 * @param email The email address to check
 * @returns Promise<boolean> True for most email addresses with basic format
 */
export async function domainHasMX(email: string): Promise<boolean> {
  // Skip complex API validation and just use basic format check
  return isValidEmailFormat(email);
}

/**
 * Basic email format validation - more relaxed than before
 * @param email The email address to validate
 * @returns boolean True if the email format is basically valid
 */
export function isValidEmailFormat(email: string): boolean {
  // Very basic email format check - just needs @ and something on both sides
  return email.includes('@') && email.split('@')[0].length > 0 && email.split('@')[1].length > 0;
}
