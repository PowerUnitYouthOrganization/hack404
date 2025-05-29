import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Checks if the user is authenticated and redirects to login if not.
 * @returns Nothing if authenticated, otherwise redirects to login page.
 */
export default async function AuthRedirect() {
	const session = await auth();

	if (!session) {
		console.log("No session found, redirecting to login");
		redirect("/login");
		return null;
	}
	return null;
}