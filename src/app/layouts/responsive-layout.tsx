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

	// Content padding
	const contentPadding = isDesktop ? "p-[64px]" : "p-6";
	
	// Logo size
	const logoSize = isDesktop ? "h-[80px]" : "h-[50px]";
	
	// Title text size
	const titleSize = isDesktop ? "text-[48px]" : "text-2xl";
	
	// Footer layout
	const footerLayout = isDesktop 
		? "flex items-center h-[218px] px-[64px] py-[70px]" 
		: "flex flex-col items-center m-6 gap-6";
	
	// Submit button width
	const submitButtonWidth = isMobile ? "w-[78px]" : isTablet ? "w-[158px]" : ""; 
	
	// Submit text
	const submitText = isDesktop 
		? (isSubmitting ? "Submitting..." : "Submit") 
		: (submitted ? "Submitted" : "Submit");
	
	// Submit button class
	const submitButtonClass = isDesktop 
		? "flex items-center justify-start text-2xl text-black bg-white pl-6 max-w-[204px]" 
		: "flex items-center justify-start text-black bg-white pl-6 max-w-[204px]";
	
	return (
		<div 
			className="min-h-screen flex flex-col relative"
			style={containerStyle}
		>
			{/* Header: different components for desktop vs mobile/tablet */}
			{isDesktop 
				? <Header onLinkWidth={setHeaderBinWidth} /> 
				: <SmallHeader onLinkWidth={setHeaderBinWidth} />}
			
			<HBorder />
			
			{/* Main content section */}
			<div className={`flex-1 flex flex-col gap-8 items-start text-left ${contentPadding} justify-between text-white`}>
				<div className="flex justify-between items-start self-stretch">
					<h1 className={`font-[300] ${titleSize} leading-[110%] tracking-[-1.44px] font-(family-name:--font-heading-light)`}>
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

			{/* Footer */}
			<footer className={footerLayout}>
				{/* Different footer layout for desktop vs mobile/tablet */}
				{isDesktop ? (
					<>
						<h1 
							className="text-2xl text-white font-(family-name:--font-heading) flex-shrink-0 pr-4"
							style={headerBinWidth ? { width: headerBinWidth } : undefined}
						>
							Coming soon <br /> Summer 2025
						</h1>
						
						{/* waitlist input and submit button */}
						<div className="relative flex w-full">
							<WaitlistBox
								email={email}
								setEmail={setEmail}
								submitted={submitted}
							/>
							
							{/* Submit button */}
							<div
								className={submitButtonClass}
								style={headerBinWidth ? { width: headerBinWidth } : undefined}
							>
								<p>{submitText}</p>
							</div>
							<button
								className="absolute top-0 right-0 w-full h-full max-w-[282px] opacity-50 cursor-pointer z-100"
								onClick={handleSubmit}
								style={headerBinWidth ? { width: headerBinWidth + 48 } : undefined}
								disabled={isSubmitting || submitted}
							></button>
							<img src="button.svg" alt="submit button arrow" />
						</div>
					</>
				) : (
					<>
						<div className="flex justify-between w-full text-white">
							<h1>Summer 2025</h1>
							<h1>Coming soon</h1>
						</div>

						{/* waitlist input and submit button */}
						<div className="relative flex w-full">
							<WaitlistBox
								email={email}
								setEmail={setEmail}
								submitted={submitted}
							/>

							{/* Submit button */}
							{!isMobile && (
								<div className={submitButtonClass}>
									<p>{submitText}</p>
								</div>
							)}
							<button
								className={`absolute top-0 right-0 h-full max-w-[282px] ${submitButtonWidth} opacity-50 cursor-pointer z-100`}
								onClick={handleSubmit}
								disabled={isSubmitting || submitted}
							></button>
							<img src="button.svg" alt="" />
						</div>
					</>
				)}
			</footer>

			{/* Grid background */}
			<div className="-z-20">
				<Grid type={deviceType} />
			</div>
			<GradientBackground />
		</div>
	);
}