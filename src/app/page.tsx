"use client";

import { useEffect, useState } from "react";
import ResponsiveLayout from "./layouts/responsive-layout";
import { toast } from "sonner"

/**
 * The main UI for desktop browsers.
 * @returns the desktop view.
 */
export default function Home() {
	const [headerBinWidth, setHeaderBinWidth] = useState<number | null>(null);
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);	const handleSubmit = async () => {
		// Don't allow submission if already in progress
		if (isSubmitting) {
			toast("Submission in progress. Please wait.");
			return;
		}

		// Check if email is empty
		if (!email.trim()) {
			toast("Please enter an email address.");
			return;
		}

		// Start submission process
		setIsSubmitting(true);
		
		try {
			// Validate email with MX record check through our API
			const validationResponse = await fetch('/api/validate-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});
			
			const validationResult = await validationResponse.json();
			
			if (!validationResult.valid) {
				toast(validationResult.reason || "Invalid email address");
				setIsSubmitting(false);
				return;
			}
		} catch (error) {
			console.error("Email validation error:", error);
			// Fall back to basic validation if API call fails
			if (!email.includes('@') || email.split('@')[0].length === 0 || email.split('@')[1].length === 0) {
				toast("Please enter a valid email address.");
				setIsSubmitting(false);
				return;
			}
		}
		try {
			// Make API call to backend (skipping complex MX validation)
			const res = await fetch("/api/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			setIsSubmitting(false);
			if (res.ok) {
				setSubmitted(true);
				toast("Thank you for joining our waitlist!");
			} else if (res.status == 409) {
				toast("You're already on the waitlist!");
			} else {
				toast("Something went wrong. Please try again.");
			}
		} catch (error: any) {
			setIsSubmitting(false);
			toast("Something went wrong. Please try again.");
			return;
		}
	};

	const layoutProps = {
		email,
		setEmail,
		headerBinWidth,
		setHeaderBinWidth,
		isSubmitting,
		setIsSubmitting,
		submitted,
		setSubmitted,
		handleSubmit,
	};
	
	return <ResponsiveLayout {...layoutProps} />;
}
