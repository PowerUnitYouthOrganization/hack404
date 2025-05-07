export default function Header() {
	return (
		<header>
			<nav className="flex h-[64px] px-[64px] items-start gap-[24px] flex-shrink-0 w-full">
				<a
					href=""
					className="flex flex-col justify-center items-start gap-[10px] flex-1 self-stretch"
				>
					About Us
				</a>
				<a
					href=""
					className="flex flex-col justify-center items-start gap-[10px] flex-1 self-stretch"
				>
					Instagram
				</a>
				<a
					href=""
					className="flex flex-col justify-center items-center gap-[10px] flex-1 self-stretch"
				>
					<img
						src="WhiteFull.png"
						alt="Logo"
						className="flex justify-center items-center w-[109px] h-auto"
					/>
				</a>
				{/* <a
					href=""
					className="flex flex-col justify-center items-start gap-[10px] flex-1 self-stretch"
				>
					<img
						src="PUYOlogo.png"
						alt="Logo"
						className="flex justify-center items-center w-[49px] h-auto"
					/>
				</a> */}
				{/* <a
					href=""
					className="flex flex-col justify-center items-end gap-[10px] flex-1 self-stretch"
				></a> */}
				<a
					href=""
					className="flex flex-col justify-center items-end gap-[10px] flex-1 self-stretch"
				>
					Sponsor us
				</a>
				{/* <a
					href=""
					className="flex flex-col justify-center items-end gap-[10px] flex-1 self-stretch"
				>
					Join waitlist
				</a> */}
				<a
					href=""
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
