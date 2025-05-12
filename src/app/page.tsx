"use client";

import { useEffect, useRef, useState } from "react";
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
	const [submitted, setSubmitted] = useState(false);
	const [viewport, setViewport] = useState({
		isMobile: false,
		isTablet: false,
		isDesktop: false,
		isUltrawide: false,
	});

	const handleSubmit = async () => {
		if (!email) return;
		await fetch("/api/waitlist", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email }),
		});
		setSubmitted(true);
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
