"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoginStatus from "@/components/login-status";
import { SessionProvider } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
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

	/*
	const handleGithubSignIn = async () => {
		setIsLoading(true);
		try {
			// Add GitHub sign-in logic here
			console.log("Signing in with GitHub");
			signIn("github", {
				redirectTo: "/", // TODO: change later actually maybe not
			});
		} catch (error) {
			console.error("GitHub sign-in error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		try {
			// Add Google sign-in logic here
			console.log("Signing in with Google");
			signIn("google", {
				redirectTo: "/", // TODO: change later
			});
		} catch (error) {
			console.error("Google sign-in error:", error);
		} finally {
			setIsLoading(false);
		}
	};
	*/

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

			{/* <div className="mt-6 grid grid-cols-2 gap-6">
				<Button
					type="button"
					onClick={handleGithubSignIn}
					disabled={isLoading}
				>
					<FaGithub className="h-5 w-5" />
					<span>GitHub</span>
				</Button>
				<Button
					type="button"
					onClick={handleGoogleSignIn}
					disabled={isLoading}
				>
					<FcGoogle className="h-5 w-5" />
					<span>Google</span>
				</Button>
			</div> */}
		</>
	);
}
