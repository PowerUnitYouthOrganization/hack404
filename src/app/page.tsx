"use client";

import { useEffect, useState } from "react";
import TabletLayout from "./layouts/tablet-layout";
import MobileLayout from "./layouts/mobile-layout";
import DesktopLayout from "./layouts/desktop-layout";

/**
 * The main UI for desktop browsers.
 * @returns the desktop view.
 */
export default function Home() {
	const [headerBinWidth, setHeaderBinWidth] = useState<number | null>(null);
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [viewport, setViewport] = useState({
		isMobile: false,
		isTablet: false,
		isDesktop: false,
		isUltrawide: false,
	});
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [lastSubmittedEmail, setLastSubmittedEmail] = useState("");

	const handleSubmit = async () => {
		// Don't allow submission if already in progress
		if (isSubmitting) {
			alert("Submission in progress. Please wait.");
			return;
		}

		// Check if email is empty
		if (!email.trim()) {
			alert("Please enter an email address.");
			return;
		}

		// Start submission process
		setIsSubmitting(true);

		// Here you would typically make an API call to your backend
		if (!email) return;
		try {
			const res = await fetch("/api/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			setIsSubmitting(false);
			if (res.ok) {
				alert("Thank you for joining our waitlist!");
			} else if (res.status == 409) {
				alert("You're already on the waitlist!");
			} else {
				alert("Something went wrong. Please try again.");
			}
		} catch (error: any) {
			alert("Something went wrong. Please try again.");
			return;
		}
	};

	useEffect(() => {
		const updateViewport = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			setViewport({
				isMobile: width < 600,
				isTablet: width >= 600 && width < 1150,
				isDesktop: width >= 1024,
				isUltrawide: width / height >= 1.85,
			});
		};

		updateViewport();
		window.addEventListener("resize", updateViewport);
		return () => window.removeEventListener("resize", updateViewport);
	}, []);

	const handleEmailChange = (newEmail: string) => {
		setEmail(newEmail);
	};

	const handleSubmit = () => {
		try {
			// Don't allow submission if already in progress
			if (isSubmitting) {
				alert("Submission in progress. Please wait.");
				return;
			}

			// Check if email is empty
			if (!email.trim()) {
				alert("Please enter an email address.");
				return;
			}

			// Check if the same email is being submitted again
			if (email === lastSubmittedEmail) {
				alert("This email has already been submitted.");
				return;
			}

			// Start submission process
			setIsSubmitting(true);

			// Here you would typically make an API call to your backend
			// Simulating API call with setTimeout
			setTimeout(() => {
				// Store the submitted email to prevent duplicate submissions
				setLastSubmittedEmail(email);
				setIsSubmitting(false);
				alert("Thank you for joining our waitlist!");
			}, 1000);
		} catch (error) {
			setIsSubmitting(false);
			alert("An error occurred. Please try again later.");
			console.error("Submission error:", error);
		}
	};

	const { isMobile, isTablet, isDesktop } = viewport;
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

	if (isMobile) {
		return <MobileLayout {...layoutProps} />;
	} else if (isTablet) {
		return <TabletLayout {...layoutProps} />;
	} else if (isDesktop) {
		return <DesktopLayout {...layoutProps} />;
	}
}
