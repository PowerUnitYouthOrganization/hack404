"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoginStatus from "@/components/login-status";
import { useSession, signIn } from "next-auth/react";
import { isProfileComplete } from "@/app/utils/profileCompletion";

/**
 * LoginForm component handles user login via email.
 * @returns Login form component that handles email login and redirects based on profile completion.
 */
export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { data: session, status } = useSession();

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
			// Check if email is already registered
			// if we never find a reason to use this, just delete it lol
			const response = await fetch("/api/check-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});
			const data = await response.json();

			if (!data.exists) console.log("New email, register: ", email);
			else console.log("Existing email, login: ", email);

			await signIn("resend", { email, redirectTo: "/application" });
		} catch (error) {
			console.error("Registration error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Show loading while checking authentication
	if (status === "loading") {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-white">Loading...</div>
			</div>
		);
	}

	// Don't show login form if already authenticated
	if (status === "authenticated") {
		if (session?.user?.email) {
			isProfileComplete(session.user.email).then((profileDone) => {
				if (profileDone) {
					window.location.href = "/application";
				} else {
					window.location.href = "/profile";
				}
			});
		}
		return null;
	}

	return (
		<form
			onSubmit={handleEmailSubmit}
			className="mt-8 space-y-6 mx-8 max-w-200"
		>
			<label htmlFor="email" className="font-lg text-white">
				Email address
			</label>
			<Input
				id="email"
				name="email"
				type="email"
				autoComplete="email"
				required
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="your@email.com"
				disabled={isLoading}
			/>
			<Button
				type="submit"
				className="bg-wpurple w-full text-black dark:text-white"
				disabled={isLoading}
			>
				{isLoading ? "Signing in..." : "Sign in with Email"}
			</Button>
		</form>
	);
}
