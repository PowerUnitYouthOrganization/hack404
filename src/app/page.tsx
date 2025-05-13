"use client";

import { useEffect, useState } from "react";
import TabletLayout from "./layouts/tablet-layout";
import MobileLayout from "./layouts/mobile-layout";
import DesktopLayout from "./layouts/desktop-layout";
import { domainHasMX, isValidEmailFormat } from "./utils/emailValidation";

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

		// Validate email format
		if (!isValidEmailFormat(email)) {
			alert("Please enter a valid email address.");
			return;
		}

		// Start submission process
		setIsSubmitting(true);

		try {
			// Check if domain has MX records
			const hasMX = await domainHasMX(email);
			if (!hasMX) {
				setIsSubmitting(false);
				alert("The email domain does not appear to be valid. Please check your email address.");
				return;
			}

			// Make API call to backend
			const res = await fetch("/api/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			setIsSubmitting(false);
			if (res.ok) {
				setSubmitted(true);
				alert("Thank you for joining our waitlist!");
			} else if (res.status == 409) {
				alert("You're already on the waitlist!");
			} else {
				alert("Something went wrong. Please try again.");
			}
		} catch (error: any) {
			setIsSubmitting(false);
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
