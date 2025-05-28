import { isProfileComplete } from "@/app/utils/profileCompletion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthRedirect() {
	const router = useRouter();
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status === "authenticated" && session?.user?.email) {
			console.log("User is authenticated:", session.user.email);
			// Check if the user has a complete profile
			isProfileComplete(session.user.email).then((profileDone) => {
				if (profileDone) {
					console.log("Profile is complete, redirecting to application");
					router.push("/application");
				} else {
					console.log(
						"Profile is not complete, redirecting to profile page",
					);
					router.push("/profile");
				}
			});
		} else if (status === "unauthenticated") {
			console.log("User is not authenticated, showing sign-in form");
			// If the user is not authenticated, we can show the sign-in form
		}
	}, [status, session]);
	return null;
}