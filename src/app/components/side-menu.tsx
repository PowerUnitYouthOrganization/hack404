import { motion, AnimatePresence } from "framer-motion";
import Grid from "./grids/mobile-grid";
import HBorder from "./h-border";

type SideMenuProps = {
	open: boolean;
	onClose: () => void;
	options: string[];
};

export default function SideMenu({ open, onClose, options }: SideMenuProps) {
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className="fixed inset-0 bg-black z-50 h-screen"
					initial={{ x: "100%" }}
					animate={{ x: 0 }}
					exit={{ x: "100%" }}
					transition={{ type: "tween", duration: 0.1 }}
				>
					<div className="flex flex-col h-full">
						<div className="h-16" />
						<HBorder />
						<Grid />

						{/* This is the key container */}
						<div className="flex flex-col justify-between items-start p-[48px_24px] flex-1 w-full">
							<div className="text-2xl text-left text-white flex flex-col gap-6 z-10">
								{/* <a href="">About us</a> */}
								<a href="https://www.instagram.com/hack404.dev/">Instagram</a>
								{/* <a href="">Sponsor Us</a> */}
								<a href="https://power-unit.org">PUYO</a>
							</div>

							<div className="pt-8">
								<img
									src="PUYOlogo.png"
									alt="PUYO Logo"
									className="h-[50px] w-auto"
								/>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
