/**
 * Checks if a user's profile is complete based on their email address.
 * @param email The email address to check for profile completion
 * @returns a Promise that resolves to true if the profile is complete, false otherwise.
 */
export async function isProfileComplete(email: string): Promise<boolean> {
  if (!email || typeof email !== "string" || !email.includes("@")) {
    throw new Error("Invalid email format");
  }
  // Fetch profile completion status from the API
  let profileDone = false;
  const profileResponse = await fetch(
    `/api/profile-done?email=${encodeURIComponent(email)}`,
  );
  const profileStatus = await profileResponse.json();
  return profileStatus.profileDone || false;
}
