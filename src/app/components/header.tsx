import { useRef, useEffect } from "react";

export default function Header() {
	// No longer need refs or effects for width measurement

	

	return (
		<header>
			<nav className="flex h-[64px] px-[64px] items-start gap-[24px] flex-shrink-0 w-full">
				<a
					href="#about-us"
					className="flex flex-col justify-center items-start gap-[10px] flex-1 self-stretch text-white"
				>
					About Us
				</a>
				<a
					href="https://www.instagram.com/hack404.dev/"
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-col justify-center items-start gap-[10px] flex-1 self-stretch text-white"
				>
					Instagram
				</a>
				<a
					href=""
					className="flex flex-col justify-center items-center gap-[10px] flex-1 self-stretch"
				>
					<img
						src="whitefull.png"
						alt="Logo"
						className="flex justify-center items-center w-[109px] h-auto"
					/>
				</a>
				<a
					href=""
					className="flex flex-col justify-center items-end gap-[10px] flex-1 self-stretch text-white"
				>
					Sponsor us
				</a>
				<a
					href="https://power-unit.org"
					className="flex flex-col justify-center items-end gap-[10px] flex-1 self-stretch"
				>
					<img
						src="PUYOlogo.png"
						alt="Logo"
						className="flex justify-center items-center w-[49px] h-auto"
					/>
				</a>
			</nav>
		</header>
	);
}
