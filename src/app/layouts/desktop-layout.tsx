import Header from "@/app/components/header";
import GradientBorder from "@/app/components/gradient-border";
import Grid from "@/app/components/grids/desktop-grid";
import HBorder from "@/app/components/h-border";
import GradientBackground from "@/app/components/gradient-background";
import WaitlistBox from "../components/waitlist-box";

type layoutProps = {
	email: string;
	setEmail: (email: string) => void;
	headerBinWidth: number | null;
	setHeaderBinWidth: (value: number | null) => void;
	submitted: boolean;
	setSubmitted: (value: boolean) => void;
	handleSubmit: () => void | Promise<void>;
};

export default function DesktopProps({
	email,
	setEmail,
	headerBinWidth,
	setHeaderBinWidth,
	submitted,
	setSubmitted,
	handleSubmit,
}: layoutProps) {
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
					className="h-full w-auto max-h-[45vh]"
				/>
			</div>

			{/* Horizontal border */}
			<HBorder />

			{/* Gradient border */}
			<GradientBorder reverse={true} />

			{/* Footer */}
			<footer className="flex items-center h-[218px] px-[64px] py-[70px]">
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
						className="flex items-center justify-start text-2xl text-black bg-white pl-6 max-w-[204px]"
						style={headerBinWidth ? { width: headerBinWidth } : undefined}
					>
						<p>{submitted ? "Submitted" : "Submit"}</p>
					</div>
					<button
						className="absolute top-0 right-0 w-full h-full max-w-[282px] opacity-50 cursor-pointer z-100"
						onClick={handleSubmit}
						style={headerBinWidth ? { width: headerBinWidth + 48 } : undefined}
						disabled={submitted}
					></button>
					<img src="button.svg" alt="submit button arrow" />
				</div>
			</footer>

			<div className="-z-20">
				<Grid />
			</div>
			<GradientBackground />
		</div>
	);
}
