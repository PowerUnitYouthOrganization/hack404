import Header from "./components/header";
import { IoMdArrowForward } from "react-icons/io";
import GradientBorder from "./components/gradient-border";

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-r from-[#3A2A9A] via-[#209A9A] to-[#829A24]">
			<Header />
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

			<GradientBorder reverse={true} />
			<footer className="homepage-footer">
				<h1 className="text-2xl w-[300px] mr-40 text-white font-(family-name:--font-heading)">
					Coming soon <br /> July 2025
				</h1>
				<div className="waitlist-input-box">
					<div className="flex items-center gap-2">
						<span className="placeholder:text-2xl text-2xl text-white font-(family-name:--font-heading-light)">
							Join our waitlist —
						</span>
						<span className="bg-gradient-to-r from-[#D3E4FF] via-[#BFF4F4] to-[#E3F9B4] bg-clip-text text-transparent text-2xl font-(family-name:--font-heading-light)">
							enter your email
						</span>
					</div>
					<input
						type="text"
						className="text-2xl flex-grow text-white font-(family-name:--font-heading-light) focus:border-transparent focus:outline-none"
					/>
				</div>

				{/* <div className="relative flex items-center justify-center w-[477px] h-[78px] bg-[url('/submit-button.svg')]">
					<div className="flex gap-4 text-black">
						<p>Submit</p>
						<p>→</p>
					</div>
				</div> */}

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
