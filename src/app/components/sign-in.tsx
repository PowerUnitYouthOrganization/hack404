"use client";
import { signIn } from "next-auth/react";

interface SignInProps {
  provider: string;
  label?: string;
}

/**
 * Renders a button that triggers the sign-in process for a specific provider.
 */
export default function SignIn({ provider, label }: SignInProps) {
  return (
    <button
      onClick={() => signIn(provider)}
      className="rounded bg-black px-4 py-2 text-white transition hover:bg-gray-800"
    >
      {label ?? `sign in with ${provider}`}
    </button>
  );
}

// function capitalize(text: string) {
// 	return text.charAt(0).toUpperCase() + text.slice(1);
// }
