"use client";
import { Button } from "@/components/ui/button";
import RoundedButton from "@/components/ui/roundedbutton";
import Image from "next/image";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";

interface LaunchpadHeaderProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export default function LaunchpadHeader({ activeTab, setActiveTab }: LaunchpadHeaderProps) {
	const [timeLeft, setTimeLeft] = useState<string>("00d 00h 00m 00s");

	useEffect(() => {
		// time until submission deadline or whatever date
		const targetDate = new Date("2025-06-15T00:00:00");
		const interval = setInterval(() => {
			const now = new Date();
			const diff = targetDate.getTime() - now.getTime();
			if (diff <= 0) {
				setTimeLeft("00d 00h 00m 00s");
				clearInterval(interval);
			} else {
				const days = Math.floor(diff / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
				);
				const minutes = Math.floor(
					(diff % (1000 * 60 * 60)) / (1000 * 60),
				);
				const seconds = Math.floor((diff % (1000 * 60)) / 1000);
				setTimeLeft(
					`${days.toString().padStart(2, "0")}d ${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`,
				);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const navItems = [
		{ label: "Home", value: "home" },
		{ label: "Agenda", value: "agenda" },
		// { label: "Mentor", value: "mentor" },
		{ label: "Resources", value: "resources" },
		{ label: "Help", value: "help" },
	]
	
	return (
		<header className="flex flex-col gap-3 w-full pb-9">
			<div className="grid h-24 p-6 gap-x-2.5 gap-y-2.5 flex-shrink-0 self-stretch grid-rows-1 grid-cols-[minmax(0,1fr)_700px_minmax(0,1fr)]">
				<div className="flex px-3 items-center gap-5 flex-1 self-stretch row-[1/2] col-[1/2]">
					<Image
						src="/clearlogo.png"
						alt="Hack404 Logo"
						width={26}
						height={19}
					/>
					<h1 className="text-white text-2xl font-(family-name:--font-heading) tracking-[-0.72px]">
						launchpad
					</h1>
				</div>
				{/* navbar */}
				<div className="flex px-[22px] flex-col justify-center items-center gap-[10px] flex-1 self-stretch col-[2/3] row-[1/2]">
					<nav className="flex p-1 items-center gap-[4px] rounded-[8px] bg-[rgba(48,242,242,0.20)] backdrop-blur-[25px] ">
						{/* the buttons 
					TODO: Add checker for active button and change the variant accordingly
					*/}
						{navItems.map((item) => (
							<Button
								key={item.value}
								variant={
									activeTab === item.value
										? "launchpad-active"
										: "launchpad-inactive"
								}
								onClick={() => setActiveTab(item.value)}
							>
								{item.label}
							</Button>
						))}
					</nav>
				</div>
				{/* profile and qr code buttons */}
				<div className="flex justify-end items-center gap-1 flex-1 self-stretch row-[1/2] col-[3/4]">
					{/* change to shadcn buttons later */}
					<RoundedButton
						color="rgba(48,242,242,0.20)"
						className="pl-4 pr-2"
					>
						Profile
						<ProfileIcon className="text-white" />
					</RoundedButton>
					<RoundedButton
						color="#C3F73A"
						className="text-black"
					>
						QR Code
						<QrCodeIcon className="text-black" />
					</RoundedButton>
				</div>
			</div>
			<div className="flex px-9 justify-between items-end self-stretch">
				<div className="flex flex-col justify-center items-start">
					<h1 className="text-[40px] leading-normal font-(family-name:--font-heading)">
						Hello firstname!
					</h1>
					<sub className="text-wcyan font-light text-sm">
						Welcome to Hack404
					</sub>
				</div>
				<div className="flex flex-col justify-center items-end">
					<h1 className="text-[40px] leading-normal font-(family-name:--font-heading-light)">
						{timeLeft}
					</h1>
					<sub className="text-wcyan font-light text-sm">
						until submission deadline
					</sub>
				</div>
			</div>
		</header>
	);
}
