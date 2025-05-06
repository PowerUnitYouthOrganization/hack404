"use client";

import { signIn } from "next-auth/react";

interface SignInProps {
	provider: string;
	label?: string;
}

export default function SignIn({ provider, label }: SignInProps) {
	return (
		<button
			onClick={() => signIn(provider)}
			className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
		>
			{label ?? `sign in with ${provider}`}
		</button>
	);
}

// function capitalize(text: string) {
// 	return text.charAt(0).toUpperCase() + text.slice(1);
// }
