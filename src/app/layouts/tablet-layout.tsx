import Header from "@/app/components/small-header";
import GradientBorder from "@/app/components/gradient-border";
import Grid from "@/app/components/grids/tablet-grid";
import HBorder from "@/app/components/h-border";
import GradientBackground from "@/app/components/gradient-background";

export default function TabletLayout() {
	return (
		<div className="min-h-screen flex flex-col relative">
			<Header />
			<HBorder />
			<div className="flex-1 flex flex-col gap-8 items-start text-left p-6 justify-between text-white">
				<div className="flex justify-between items-start self-stretch">
					<h1 className="font-[300] text-2xl leading-[110%] tracking-[-1.44px] font-(family-name:--font-heading-light)">
						a toronto based <br /> hackathon
					</h1>
					<img
						src="whitesmall.png"
						alt=""
						className="h-[50px] w-auto flex-shrink-0"
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
			<footer className="flex flex-col items-center m-6 gap-6">
				<div className="flex justify-between w-full text-white">
					<h1>Summer 2025</h1>
					<h1>Coming soon</h1>
				</div>

				{/* waitlist input and submit button */}
				<div className="flex w-full">
					<div className="waitlist">
						<span className="placeholder:text-white font-(family-name:--font-heading-light)">
							Join our waitlist —
						</span>
						<span className="bg-gradient-to-r from-[#C3D4FF] via-[#9FEFEF] to-[#D3F4A4] bg-clip-text text-transparent font-(family-name:--font-heading-light)">
							enter your email
						</span>
					</div>

					{/* Submit button */}
					<div className="flex items-center justify-start text-black bg-white pl-6 max-w-[204px] font-(family-name:--font-heading)">
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
