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
	isSubmitting: boolean;
	setIsSubmitting: (value: boolean) => void;
	submitted: boolean;
	setSubmitted: (value: boolean) => void;
	handleSubmit: () => void | Promise<void>;
};

export default function ResponsiveLayout({
	email,
	setEmail,
	isSubmitting,
	setIsSubmitting,
	submitted,
	setSubmitted,
	handleSubmit,
}: LayoutProps) {
    console.log("responsive layout rendered");

	// Submit text based on submission state
	const submitText = isSubmitting 
		? "Submitting..." 
		: submitted ? "Submitted" : "Submit";
	
	return (
		<>
			<div 
				className="min-h-screen flex flex-col relative lg:max-w-[calc(100vh*(7/3))]"
			>
				{/* Header: different components for desktop vs mobile/tablet */}
				<div className="hidden lg:block">
					<Header />
				</div>
				<div className="block lg:hidden">
					<SmallHeader />
				</div>
				
				{/* Grid and background */}
				<div className="-z-20">
					<Grid />
				</div>
				<div className="black-screen" />
				<GradientBackground />
				
				<HBorder />
				
				{/* Main content section */}
				<div className="flex-1 flex flex-col gap-8 items-start text-left p-6 lg:p-[64px] justify-between text-white">
					<div className="flex justify-between items-start self-stretch">
						<h1 className="font-[300] text-2xl lg:text-[48px] leading-[110%] tracking-[-1.44px] font-(family-name:--font-heading-light)">
							a toronto based <br /> hackathon
						</h1>
						<img
							src="whitesmall.png"
							alt=""
							className="h-[50px] lg:h-[80px] w-auto flex-shrink-0"
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
				<footer className="flex flex-col items-center m-6 gap-6 lg:flex-row lg:items-center lg:h-[218px] lg:px-[64px] lg:py-[70px] lg:m-0">
					{/* Coming soon text - different layout for desktop vs mobile/tablet */}
					<div className="hidden lg:block flex-shrink-0">
						<h1 
							className="text-2xl text-white font-(family-name:--font-heading) flex-shrink-0 pr-4"
						>
							Coming soon <br />
							Summer 2025
						</h1>
					</div>
					<div className="flex justify-between w-full text-white lg:hidden">
						<h1>Summer 2025</h1>
						<h1>Coming soon</h1>
					</div>
					
					{/* Waitlist input and submit button */}
					<div className="relative flex w-full">
						<WaitlistBox
							email={email}
							setEmail={setEmail}
							submitted={submitted}
						/>
						
						{/* Submit button - show text for tablet and desktop only */}
						<div className="hidden sm:flex items-center justify-start text-black bg-white pl-6 max-w-[204px] lg:text-2xl w-[158px] lg:w-[178px]">
							<p>{submitText}</p>
						</div>
						
						{/* Clickable button overlay */}
						<button
							className="absolute top-0 right-0 h-full sm:w-[158px] lg:w-[178px] max-w-[282px] opacity-50 cursor-pointer z-100"
							onClick={handleSubmit}
							disabled={isSubmitting || submitted}
						></button>
						<img src="button.svg" alt="submit button arrow" />
					</div>
				</footer>
			</div>

			{/* ========================= SECOND HALF OF PAGE ========================= */}
			{/* About page and contact page (second screen) */}
			<div
				id="about-us"
				className="min-h-screen flex flex-col relative justify-between lg:max-w-[calc(100vh*(7/3))]"
			>
				<div
					className="flex flex-col items-start text-left justify-between text-white"
				>
					{/* about us */}
					<div className="absolute inset-0 bg-background -z-30" />
					<div
						className="flex flex-col sm:flex-row gap-12 sm:gap-6 items-start shrink-0 py-[30px] px-[24px] sm:px-[24px] sm:py-[64px] lg:px-[64px] lg:py-[70px]"
					>
						<h1
							className="text-2xl lg:text-4xl font-(family-name:--font-heading) shrink-0 leading-[110%] w-[130px]"
						>
							About us
						</h1>
						{/* there is DEFINITELY a better way to do this but im too tired */}
						<p
							className="text-[28px] tracking-[-0.84px] sm:text-[32px] sm:tracking-[-0.96px] lg:text-[48px] lg:tracking-[-1.44px] font-(family-name:--font-heading-light) leading-[110%] gradient-text"
						>
							Hack404{" "}
							<span className="solid-white">
								is coming soon! We're a hackathon based in
							</span>{" "}
							Toronto{" "}
							<span className="solid-white">
								for secondary and post-secondary students, open to anyone
								from{" "}
							</span>{" "}
							beginners <span className="solid-white">to</span> experienced{" "}
							<span className="solid-white"> hackers. </span>Sign up
							<span className="solid-white">
								{" "}
								today and experience the tech of the future.
							</span>
						</p>
					</div>
					<HBorder />
					{/* contact */}
					<div
						className="flex py-[30px] px-[24px] sm:px-[24px] sm:py-[64px] lg:px-[64px] lg:py-[70px] justify-between items-start self-stretch"
					>
						<div className="flex-col items-start gap-6">
							<h1
								className="text-2xl lg:text-4xl font-(family-name:--font-heading) shrink-0"
							>
								Contact
							</h1>
							{/* Messy text formatting, fix later */}
							<p
								className="gradient-text text-base sm:text-[28px] lg:text-[28px] font-(family-name:--font-heading-light) [line-height:110%] [letter-spacing:-0.84px]"
							>
								emma.xing@power-unit.org <br />
								support@hack404.dev
							</p>
						</div>
						<div className="hidden sm:block">
							<h1
								className="text-right [line-height:110%] [letter-spacing:-1.44px] text-[40px] lg:text-[48px] font-(family-name:--font-heading-light)"
							>
								a toronto based <br /> hackathon
							</h1>
						</div>
					</div>
					<HBorder />
				</div>
				<div
					className="grow flex flex-col gap-16 justify-between items-end h-full p-6 sm:px-6 sm:py-[38px] lg:p-16"
				>
					<div className="block sm:hidden">
						<h1
							className="text-right [line-height:110%] [letter-spacing:-1.44px] text-[38px] font-(family-name:--font-heading-light)"
						>
							a toronto based <br /> hackathon
						</h1>
					</div>
					<div className="flex justify-between items-end self-stretch">
						<img
							src="whitefull.png"
							alt=""
							className="w-[135px] sm:w-[130px]"
						/>
						<img
							src="PUYOlogo.png"
							alt=""
							className="w-[135px] sm:w-[130px]"
						/>
					</div>
				</div>
			</div>
		</>
	);
}