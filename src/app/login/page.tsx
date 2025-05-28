"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoginStatus from "@/components/login-status";
import { SessionProvider } from "next-auth/react";
import { signIn } from "next-auth/react";

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

	return (
		<>
			{/* Get session */}
			<SessionProvider>
				<LoginStatus />
			</SessionProvider>

			{/* Sign in form */}

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
		</>
	);
}
