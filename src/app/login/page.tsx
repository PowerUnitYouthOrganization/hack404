"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import Link from "next/link";

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
			const response = await fetch("/api/check-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});
			const data = await response.json();
			if (data.exists) {
				console.error("Email already registered");
				return;
			}
			// Add your email registration logic here
			console.log("Email registration with:", email);
			// Use NextAuth.js to send a sign-in link to the email
			await signIn("resend", { email });
		} catch (error) {
			console.error("Registration error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGithubSignIn = async () => {
		setIsLoading(true);
		try {
			// Add GitHub sign-in logic here
			console.log("Signing in with GitHub");
			signIn("github", {
				redirectTo: "/", // TODO: change later
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

	return (
		<div className="bg-background flex min-h-screen items-center justify-center">
			<div className="border-border bg-card w-full max-w-md space-y-8 rounded-lg border p-8 shadow-lg backdrop-blur-sm">
				<div className="text-center">
					<h1 className="font-heading text-4xl font-bold text-black">
						Enter your email
					</h1>
					<p className="text-muted-foreground mt-2 text-sm">
						Create your account to get started
					</p>
				</div>

				<form onSubmit={handleEmailSubmit} className="mt-8 space-y-6">
					<div className="space-y-2">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-black"
						>
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
							className="border-border bg-background/50 text-foreground w-full"
							placeholder="your@email.com"
							disabled={isLoading}
						/>
					</div>

					<Button
						type="submit"
						className="bg-wpurple w-full text-black hover:opacity-90 dark:text-white"
						disabled={isLoading}
					>
						{isLoading ? "Signing up..." : "Sign up with Email"}
					</Button>
				</form>

				<div className="mt-6">
					<div className="relative">
						<div className="relative flex justify-center text-sm">
							<span className="text-muted-foreground px-2">
								Or continue with
							</span>
						</div>
					</div>

					<div className="mt-6 grid grid-cols-2 gap-3">
						<Button
							type="button"
							onClick={handleGithubSignIn}
							className="dark:bg-background dark:hover:bg-background/80 flex items-center justify-center gap-2 bg-black text-white hover:bg-black/90 dark:border dark:border-white/20"
							disabled={isLoading}
						>
							<FaGithub className="h-5 w-5" />
							<span>GitHub</span>
						</Button>
						<Button
							type="button"
							onClick={handleGoogleSignIn}
							className="dark:bg-background dark:hover:bg-background/80 flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 dark:border dark:border-white/20 dark:text-white"
							disabled={isLoading}
						>
							<FcGoogle className="h-5 w-5" />
							<span>Google</span>
						</Button>
					</div>
				</div>

				<div className="mt-6 text-center text-sm">
					<p className="text-muted-foreground">
						Already have an account?{" "}
						<Link
							href="/login"
							className="text-primary hover:text-primary/80 hover:underline"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
