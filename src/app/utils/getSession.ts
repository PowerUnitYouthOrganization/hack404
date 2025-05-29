import { auth } from "@/lib/auth";

/**
 * Checks if the user is authenticated.
 * @returns A Promise that resolves to true if authenticated, or false if not.
 */
export default async function getSession() {
	const session = await auth();
	if (!session) return null;
	return session.user;
}
