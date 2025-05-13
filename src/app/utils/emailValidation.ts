
/**
 * Checks if a domain has MX records indicating it can receive emails
 * @param email The email address to check
 * @returns Promise<boolean> True if the domain has MX records
 */
export async function domainHasMX(email: string): Promise<boolean> {
  if (!email || !email.includes("@")) return false;
  
  try {
    const response = await fetch('/api/validate-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    const data = await response.json();
    return data.valid;
  } catch {
    return false;
  }
}

/**
 * Basic email format validation
 * @param email The email address to validate
 * @returns boolean True if the email format is valid
 */
export function isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
