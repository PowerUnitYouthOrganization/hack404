import Header from "./components/header";
import { IoMdArrowForward } from "react-icons/io";
import GradientBorder from "./components/gradient-border";
import HBorder from "./components/h-border";
import Grid from "./components/grid";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col">
			<Grid />
			<Header />
			<HBorder />
			<main className="flex-1 flex flex-col gap-8 items-center sm:items-start text-center sm:text-left">
				<div className="flex-1 flex flex-col p-[64px] justify-between items-start">
					<div className="flex justify-between items-start self-stretch">
						<h1 className="text-white font-[300] text-[48px] leading-[110%] tracking-[-1.44px] font-(family-name:--font-heading-light)">
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
			</main>

			<GradientBorder />
			<footer className="homepage-footer">
				<h1 className="text-2xl font-(family-name:--font-heading) w-[300px] mr-40">
					Coming soon <br /> July 2025
				</h1>
				<div className="waitlist-input-box">
					<input
						type="text"
						placeholder="Join our waitlist — enter your email"
						className="placeholder:text-2xl text-2xl flex-grow text-white font-(family-name:--font-heading-light) focus:border-transparent focus:outline-none"
					/>
				</div>

				<div className="relative flex items-center justify-center w-[477px] h-[78px]">
					<svg
						className="absolute inset-0 z-0"
						xmlns="http://www.w3.org/2000/svg"
						width="282"
						height="78"
						viewBox="0 0 282 78"
						fill="none"
					>
						<path
							d="M282 53.8579C282 56.51 280.946 59.0536 279.071 60.9289L264.929 75.0711C263.054 76.9464 260.51 78 257.858 78H0V0H277C279.761 0 282 2.23858 282 5V53.8579Z"
							fill="white"
						/>
					</svg>

					<div className="relative z-10 flex items-center justify-between gap-4 text-2xl text-black w-full mx-[24px] font-(family-name:--font-heading)">
						<p>Submit</p>
						<IoMdArrowForward size={24} />
					</div>
				</div>
			</footer>
		</div>
	);
}
