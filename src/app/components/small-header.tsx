import { useRef, useEffect, useState } from "react";
import SideMenu from "./side-menu";

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	useEffect(() => {
		if (menuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [menuOpen]);

	return (
		<header>
			<nav className="flex h-[64px] px-6 items-start gap-6 flex-shrink-0 w-full">
				<a
					href=""
					className="flex flex-col justify-center items-start gap-[10px] flex-1 self-stretch z-100"
				>
					<img
						src="WhiteFull.png"
						alt="Logo"
						className="flex justify-center items-center w-[109px] h-auto"
					/>
				</a>
				{/* TODO: CONVERT TO DROPDOWN */}
				<button
					className="flex flex-col justify-center items-end gap-[10px] flex-1 self-stretch z-100"
					onClick={toggleMenu}
				>
					{menuOpen ? "CLOSE" : "MENU"}
				</button>
			</nav>
			<SideMenu
				open={menuOpen}
				onClose={toggleMenu}
				options={["Home", "About", "Sponsors", "FAQ"]}
			/>
		</header>
	);
}
