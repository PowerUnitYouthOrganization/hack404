"use client";
import { useSession } from "next-auth/react";
import { JSX } from "react";

/**
 * Display the login status of the user.
 * If the user is authenticated, show their email.
 * If the user is not authenticated, show "Log in".
 * Probably most useful for the header.
 * @returns {JSX.Element} The login status component.
 */
export default function LoginStatus(): JSX.Element {
	const { data: session, status } = useSession();

	if (status === "authenticated") {
		return <p>{session?.user?.email}</p>;
	}
	return <p>Log in</p>;
}
