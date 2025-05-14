import Header from "@/app/components/header";
import SmallHeader from "@/app/components/small-header";
import GradientBorder from "@/app/components/gradient-border";
import Grid from "@/app/components/grid";
import HBorder from "@/app/components/h-border";
import GradientBackground from "@/app/components/gradient-background";
import WaitlistBox from "../components/waitlist-box";

type LayoutProps = {
	email: string;
	setEmail: (email: string) => void;
	headerBinWidth: number | null;
	setHeaderBinWidth: (value: number | null) => void;
	isSubmitting: boolean;
	setIsSubmitting: (value: boolean) => void;
	submitted: boolean;
	setSubmitted: (value: boolean) => void;
	handleSubmit: () => void | Promise<void>;
	deviceType: "mobile" | "tablet" | "desktop";
};

export default function ResponsiveLayout({
	email,
	setEmail,
	headerBinWidth,
	setHeaderBinWidth,
	isSubmitting,
	setIsSubmitting,
	submitted,
	setSubmitted,
	handleSubmit,
	deviceType,
}: LayoutProps) {
	// Determine dynamic values based on device type
	const isDesktop = deviceType === "desktop";
	const isMobile = deviceType === "mobile";
	const isTablet = deviceType === "tablet";

	console.log(`${deviceType} layout rendered`);

	// Container styles
	const containerStyle = {
		maxWidth: isDesktop ? `calc(100vh * (7 / 3))` : undefined,
	};

	/* ========================= FIRST HALF OF PAGE =========================  */

	// Content padding
	const contentPadding = isDesktop ? "p-[64px]" : "p-6";

	// Logo size
	const logoSize = isDesktop ? "h-[80px]" : "h-[50px]";

	// Title text size
	const titleSize = isDesktop ? "text-[48px]" : "text-2xl";

	// Footer layout
	const submissionArea = isDesktop
		? "flex items-center h-[218px] px-[64px] py-[70px]"
		: "flex flex-col items-center m-6 gap-6";

	// Submit button width
	const submitButtonWidth = isMobile ? "w-[78px]" : isTablet ? "w-[158px]" : "";

	// Submit text
	const submitText = isDesktop
		? isSubmitting
			? "Submitting..."
			: "Submit"
		: submitted
			? "Submitted"
			: "Submit";

	// Submit button class
	const submitButtonClass = isDesktop
		? "flex items-center justify-start text-2xl text-black bg-white pl-6 max-w-[204px]"
		: "flex items-center justify-start text-black bg-white pl-6 max-w-[204px]";

	/* ========================= SECOND HALF OF PAGE ========================= */
	// body text size
	const aboutTextStyle = isDesktop
		? "text-[48px] tracking-[-1.44px]"
		: isTablet
			? "text-[32px] tracking-[-0.96px]"
			: "text-[28px] tracking-[-0.84px]";

	const aboutPadding = isDesktop
		? "px-[64px] py-[70px]"
		: isTablet
			? "px-[24px] py-[64px]"
			: "py-[30px] px-[24px]";

	const aboutLayout = isMobile ? "flex flex-col gap-12" : "flex gap-6";

	const contactTextSize = isDesktop
		? "text-[28px]"
		: isTablet
			? "text-[28px]"
			: "text-base";

	const contactLayout = isMobile ? "" : "";

	const taglineSize = isDesktop
		? "text-[48px]"
		: isTablet
			? "text-[40px]"
			: "text-[38px]";

	const footerPadding = isDesktop
		? "p-16"
		: isTablet
			? "px-6 py-[38px]"
			: "p-6";

	return (
		<>
			<div
				className="min-h-screen flex flex-col relative"
				style={containerStyle}
			>
				{/* Header: different components for desktop vs mobile/tablet */}
				{isDesktop ? (
					<Header onLinkWidth={setHeaderBinWidth} />
				) : (
					<SmallHeader onLinkWidth={setHeaderBinWidth} />
				)}

				{/* Grid and background */}
				<div className="-z-20">
					<Grid type={deviceType} />
				</div>
				<div className="black-screen" />
				<GradientBackground />

				<HBorder />

				{/* Main content section */}
				<div
					className={`flex-1 flex flex-col gap-8 items-start text-left ${contentPadding} justify-between text-white`}
				>
					<div className="flex justify-between items-start self-stretch">
						<h1
							className={`font-[300] ${titleSize} leading-[110%] tracking-[-1.44px] font-(family-name:--font-heading-light)`}
						>
							a toronto based <br /> hackathon
						</h1>
						<img
							src="whitesmall.png"
							alt=""
							className={`${logoSize} w-auto flex-shrink-0`}
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

				{/* Submission Area */}
				<div className={submissionArea}>
					{/* Coming soon text - different layout for desktop vs mobile/tablet */}
					{isDesktop ? (
						<h1
							className="text-2xl text-white font-(family-name:--font-heading) flex-shrink-0 pr-4"
							style={headerBinWidth ? { width: headerBinWidth } : undefined}
						>
							Coming soon <br /> Summer 2025
						</h1>
					) : (
						<div className="flex justify-between w-full text-white">
							<h1>Summer 2025</h1>
							<h1>Coming soon</h1>
						</div>
					)}

					{/* Waitlist input and submit button - common for all layouts */}
					<div className="relative flex w-full">
						<WaitlistBox
							email={email}
							setEmail={setEmail}
							submitted={submitted}
						/>

						{/* Submit button - show text for desktop and tablet only */}
						{!isMobile && (
							<div
								className={submitButtonClass}
								style={
									headerBinWidth
										? {
												width: isDesktop ? headerBinWidth + 48 : headerBinWidth,
											}
										: undefined
								}
							>
								<p>{submitText}</p>
							</div>
						)}

						{/* Clickable button overlay */}
						<button
							className={`absolute top-0 right-0 h-full ${isMobile ? submitButtonWidth : "w-full"} max-w-[282px] opacity-50 cursor-pointer z-100`}
							onClick={handleSubmit}
							disabled={isSubmitting || submitted}
						></button>
						<img src="button.svg" alt="submit button arrow" />
					</div>
				</div>
			</div>

			{/* ========================= SECOND HALF OF PAGE ========================= */}
			{/* About page and contact page (second screen) */}
			<div
				id="about-us"
				className="min-h-screen flex flex-col relative justify-between"
				style={containerStyle}
			>
				<div
					className={`flex flex-col items-start text-left justify-between text-white`}
				>
					{/* about us */}
					<div className="absolute inset-0 bg-background -z-30" />
					<div
						className={`${aboutLayout} items-start shrink-0 ${aboutPadding} `}
					>
						<h1
							className={`${titleSize} font-(family-name:--font-heading) shrink-0`}
							style={
								!isMobile && headerBinWidth
									? { width: headerBinWidth }
									: undefined
							}
						>
							About us
						</h1>
						<p
							className={`${aboutTextStyle} font-(family-name:--font-heading-light) leading-[110%]`}
						>
							Hack404 is coming soon. We're a Toronto-based hackathon for
							secondary and post-secondary students, open to anyone from
							beginners to experienced hackers. Sign up now, experience the tech
							of the future.
						</p>
					</div>
					<HBorder />
					{/* contact */}
					<div
						className={`flex ${aboutPadding} justify-between items-start self-stretch`}
					>
						<div className="flex-col items-start gap-6 ">
							<h1
								className={`${titleSize} font-(family-name:--font-heading) shrink-0`}
							>
								Contact
							</h1>
							{/* Messy text formatting, fix later */}
							<p
								className={`gradient-text ${contactTextSize} font-(family-name:--font-heading-light) [style="line-height:110%;letter-spacing:-0.84px"]`}
							>
								emma.xing@power-unit.org <br />
								support@hack404.dev
							</p>
						</div>
						{!isMobile && (
							<h1
								className={`text-right [line-height:110%] [letter-spacing:-1.44px] ${taglineSize} font-(family-name:--font-heading-light)`}
							>
								a toronto based <br /> hackathon
							</h1>
						)}
					</div>
					<HBorder />
				</div>
				<div
					className={`grow flex flex-col gap-16 justify-between items-end h-full ${footerPadding}`}
				>
					{isMobile && (
						<h1
							className={`text-right [line-height:110%] [letter-spacing:-1.44px] ${taglineSize} font-(family-name:--font-heading-light)`}
						>
							a toronto based <br /> hackathon
						</h1>
					)}
					<div className="flex justify-between items-end self-stretch">
						<img
							src="whitefull.png"
							alt=""
							style={
								isMobile
									? { width: "135px" }
									: headerBinWidth
										? { width: headerBinWidth }
										: undefined
							}
						/>
						<img
							src="PUYOlogo.png"
							alt=""
							className=""
							style={
								isMobile
									? { width: "135px" }
									: headerBinWidth
										? { width: headerBinWidth }
										: undefined
							}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
