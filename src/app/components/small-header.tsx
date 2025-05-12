import { useRef, useEffect } from "react";

export default function Header({
	onLinkWidth,
}: {
	onLinkWidth?: (w: number) => void;
}) {
	const elementRef = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		const updateWidth = () => {
			if (elementRef.current && onLinkWidth) {
				onLinkWidth(elementRef.current.offsetWidth);
			}
		};

		updateWidth(); // initial call
		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	}, [onLinkWidth]);

	return (
		<header>
			<nav className="flex h-[64px] px-6 items-start gap-6 flex-shrink-0 w-full">
				<a
					href=""
					className="flex flex-col justify-center items-start gap-[10px] flex-1 self-stretch"
				>
					<img
						src="WhiteFull.png"
						alt="Logo"
						className="flex justify-center items-center w-[109px] h-auto"
					/>
				</a>
				{/* TODO: CONVERT TO DROPDOWN */}
				<a
					href=""
					className="flex flex-col justify-center items-end gap-[10px] flex-1 self-stretch"
				>
					MENU
				</a>
			</nav>
		</header>
	);
}
