"use client";

import Header from "./components/header";
import GradientBorder from "./components/gradient-border";
import Grid from "./components/grids/desktop-grid";
import HBorder from "./components/h-border";
import GradientBackground from "./components/gradient-background";
import { useEffect, useState } from "react";
import TabletLayout from "./layouts/tablet-layout";
import MobileLayout from "./layouts/mobile-layout";

/**
 * The main UI for desktop browsers.
 * @returns the desktop view.
 */
export default function Home() {
	const [headerBinWidth, setHeaderBinWidth] = useState<number | null>(null);
	const [viewport, setViewport] = useState({
		isMobile: false,
		isTablet: false,
		isDesktop: false,
	});

	useEffect(() => {
		const updateViewport = () => {
			const width = window.innerWidth;
			setViewport({
				isMobile: width < 600,
				isTablet: width >= 600 && width < 1150,
				isDesktop: width >= 1024,
			});
		};

		updateViewport();
		window.addEventListener("resize", updateViewport);
		return () => window.removeEventListener("resize", updateViewport);
	}, []);

	const { isMobile, isTablet, isDesktop } = viewport;

	if (isMobile) {
		return MobileLayout(); //mobile
	} else if (isTablet) {
		return TabletLayout(); // tablet
	} else {
		// desktop
		// DO NOT attempt to put this in a separate layout file. it screws with react hooks.
		// actually do it if you want but you have been warned
		// if you pull it off please tell me about it
		return (
			<div className="min-h-screen flex flex-col relative">
				<Header onLinkWidth={setHeaderBinWidth} />
				<HBorder />
				<div className="flex-1 flex flex-col gap-8 items-start text-left p-[64px] justify-between text-white">
					<div className="flex justify-between items-start self-stretch">
						<h1 className="font-[300] text-[48px] leading-[110%] tracking-[-1.44px] font-(family-name:--font-heading-light)">
							a toronto based <br /> hackathon
						</h1>
						<img
							src="whitesmall.png"
							alt=""
							className="h-[80px] w-auto flex-shrink-0"
						/>
					</div>
					<img
						src="whitetext.png"
						alt="hack404 big label"
						className="h-auto w-full"
					/>
				</div>

				{/* Horizontal border */}
				<HBorder />

				{/* Gradient border */}
				<GradientBorder reverse={true} />

				{/* Footer */}
				<footer className="flex items-center h-[218px] px-[64px] py-[70px]">
					{isTablet ? (
						<div className="flex justify-between text-white">
							<h1 className="text-2xl">Summer 2025</h1>
							<h1 className="text-2xl">Coming soon</h1>
						</div>
					) : (
						<h1
							className="text-2xl text-white font-(family-name:--font-heading) flex-shrink-0 pr-4"
							style={headerBinWidth ? { width: headerBinWidth } : undefined}
						>
							Coming soon <br /> Summer 2025
						</h1>
					)}

					{/* waitlist input and submit button */}
					<div className="flex w-full">
						<div className="waitlist">
							<span className="placeholder:text-2xl text-2xl text-white font-(family-name:--font-heading-light)">
								Join our waitlist —
							</span>
							<span className="bg-gradient-to-r from-[#C3D4FF] via-[#9FEFEF] to-[#D3F4A4] bg-clip-text text-transparent text-2xl font-(family-name:--font-heading-light)">
								enter your email
							</span>
						</div>

						{/* Submit button */}
						<div
							className="flex items-center justify-start text-2xl text-black bg-white pl-6 max-w-[204px] font-(family-name:--font-heading)"
							style={headerBinWidth ? { width: headerBinWidth } : undefined}
						>
							<p>Submit</p>
						</div>
						<img src="button.svg" alt="" />
					</div>
				</footer>

				<div className="-z-20">
					<Grid />
				</div>
				<GradientBackground />
			</div>
		);
	}
}
