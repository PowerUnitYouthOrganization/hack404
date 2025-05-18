import Header from "@/components/header";
import SmallHeader from "@/components/small-header";
import GradientBorder from "@/components/gradient-border";
import Grid from "@/components/grid";
import HBorder from "@/components/h-border";
import GradientBackground from "@/components/gradient-background";
import WaitlistBox from "../../components/waitlist-box";
import { useGridColWidth } from "../contexts/GridCtx";

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
}: LayoutProps) {
	console.log("responsive layout rendered");

	// Submit text based on submission state
	const submitText = isSubmitting
		? "Submitting..."
		: submitted
			? "Submitted"
			: "Submit";

	const [colWidth] = useGridColWidth(); // Get the column width from context

	return (
		<>
			<div className="desktop:max-w-[calc(100vh*(7/3))] relative flex min-h-screen flex-col">
				{/* Header: different components for desktop vs mobile/tablet */}
				<div className="desktop:block hidden">
					<Header />
				</div>
				<div className="desktop:hidden block">
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
				<div className="desktop:p-[64px] flex flex-1 flex-col items-start justify-between gap-8 p-6 text-left text-white">
					<div className="flex items-start justify-between self-stretch">
						<h1 className="desktop:text-[48px] font-(family-name:--font-heading-light) text-2xl leading-[110%] font-[300] tracking-[-1.44px]">
							a toronto based <br /> hackathon
						</h1>
						<img
							src="whitesmall.png"
							alt=""
							className="desktop:h-[80px] h-[50px] w-auto flex-shrink-0"
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
				<footer className="desktop:m-0 desktop:h-[218px] desktop:flex-row desktop:items-center desktop:px-[64px] desktop:py-[70px] m-6 flex flex-col items-center gap-6">
					{/* Coming soon text - different layout for desktop vs mobile/tablet */}
					<div
						className="desktop:block hidden"
						style={{ width: `calc(${colWidth}px - 1.5rem)` }}
					>
						<h1 className="pr-4 font-(family-name:--font-heading) text-2xl text-white">
							Coming soon <br />
							July 2025
						</h1>
					</div>
					<div className="desktop:hidden flex w-full justify-between text-white">
						<h1>July 2025</h1>
						<h1>Coming soon</h1>
					</div>

					{/* Waitlist input and submit button */}
					<div className="relative flex w-full flex-1">
						<WaitlistBox
							email={email}
							setEmail={setEmail}
							submitted={submitted}
						/>

						{/* Clickable button overlay */}
						<button
							className="flex flex-shrink-0 flex-row items-center justify-start"
							onClick={handleSubmit}
							disabled={isSubmitting || submitted}
						>
							{/* Submit button - show text for tablet and desktop only */}
							<p className="desktop:w-44 desktop:text-2xl tablet:flex hidden h-full w-24 max-w-[204px] items-center justify-start bg-white pl-6 text-black">
								{submitText}
							</p>
							<img
								className="h-full"
								src="button.svg"
								alt="submit button arrow"
							/>
						</button>
					</div>
				</footer>
			</div>

			{/* ========================= SECOND HALF OF PAGE ========================= */}
			{/* About page and contact page (second screen) */}
			<div
				id="about-us"
				className="desktop:max-w-[calc(100vh*(7/3))] relative flex min-h-screen flex-col justify-between"
			>
				<div className="flex flex-col items-start justify-between text-left text-white">
					{/* about us */}
					<div className="bg-background absolute inset-0 -z-30" />
					<div className="desktop:px-[64px] desktop:py-[70px] tablet:flex-row tablet:gap-6 tablet:px-[24px] tablet:py-[64px] flex shrink-0 flex-col items-start gap-12 px-[24px] py-[30px]">
						<h1
							className="desktop:text-5xl shrink-0 font-(family-name:--font-heading) text-4xl leading-[110%]"
							style={{ width: `calc(${colWidth}px - 1.5rem)` }}
						>
							About us
						</h1>
						{/* there is DEFINITELY a better way to do this but im too tired */}
						<p className="gradient-text desktop:text-[48px] desktop:tracking-[-1.44px] tablet:text-[32px] tablet:tracking-[-0.96px] font-(family-name:--font-heading-light) text-[28px] leading-[110%] tracking-[-0.84px]">
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
					<div className="desktop:px-[64px] desktop:py-[70px] tablet:px-[24px] tablet:py-[64px] flex items-start justify-between self-stretch px-[24px] py-[30px]">
						<div className="flex-col items-start gap-6">
							<h1 className="desktop:text-5xl shrink-0 font-(family-name:--font-heading) text-4xl">
								Contact
							</h1>
							{/* Messy text formatting, fix later */}
							<p className="gradient-text desktop:text-[28px] tablet:text-[28px] font-(family-name:--font-heading-light) text-base [line-height:110%] [letter-spacing:-0.84px]">
								emma.xing@power-unit.org <br />
								support@hack404.dev
							</p>
						</div>
						<div className="tablet:block hidden">
							<h1 className="desktop:text-[48px] text-right font-(family-name:--font-heading-light) text-[40px] [line-height:110%] [letter-spacing:-1.44px]">
								a toronto based <br /> hackathon
							</h1>
						</div>
					</div>
					<HBorder />
				</div>
				<div className="desktop:p-16 tablet:px-6 tablet:py-[38px] flex h-full grow flex-col items-end justify-between gap-16 p-6">
					<div className="tablet:hidden block">
						<h1 className="text-right font-(family-name:--font-heading-light) text-[38px] [line-height:110%] [letter-spacing:-1.44px]">
							a toronto based <br /> hackathon
						</h1>
					</div>
					<div className="flex items-end justify-between self-stretch">
						<img
							src="whitefull.png"
							alt=""
							className="tablet:w-[130px] w-[135px]"
						/>
						<img
							src="PUYOlogo.png"
							alt=""
							className="tablet:w-[130px] w-[135px]"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
