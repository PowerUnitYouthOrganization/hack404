"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoginStatus from "@/components/login-status";
import { SessionProvider, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import LoginForm from "@/app/login/loginForm";
import { isProfileComplete } from "@/app/utils/profileCompletion";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (!email) {
				console.error("Email is required");
				return;
			}
			if (!/\S+@\S+\.\S+/.test(email)) {
				console.error("Invalid email format");
				return;
			}

			const emailResponse = await fetch(
				`/api/email-exists?email=${encodeURIComponent(email)}`,
			);
			const emailData = await emailResponse.json();

			if (!emailData.exists) {
				console.log("New email, register and send to profile: ", email);
				await signIn("resend", { email, redirectTo: "/profile" });
				return;
			} else {
				console.log("Existing email, login: ", email);
			}

			if (await isProfileComplete(email)) {
				console.log("Profile is complete, redirecting to application");
				// Redirect to the application page if profile is complete
				await signIn("resend", {
					email,
					redirectTo: "/application",
				});
			} else {
				console.log(
					"Profile is not complete, redirecting to profile page",
				);
				// Redirect to the profile page if profile is not complete
				await signIn("resend", {
					email,
					redirectTo: "/profile",
				});
			}
		} catch (error) {
			console.error("Registration error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{/* Get session */}
			<SessionProvider>
				<LoginStatus />
				<LoginForm/>
			</SessionProvider>
		</>
	);
}
