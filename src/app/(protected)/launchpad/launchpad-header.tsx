"use client";

import { Button } from "@/components/ui/button";
import RoundedButton from "@/components/ui/roundedbutton";
import Image from "next/image";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface LaunchpadHeaderProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
}

export default function LaunchpadHeader({ activeTab, setActiveTab }: LaunchpadHeaderProps) {
	const {data: session} = useSession();
	const avatarUrl = session?.user?.image || "";

	const navItems = [
		{ label: "Home", value: "home" },
		// { label: "Agenda", value: "agenda" },
		// { label: "Mentor", value: "mentor" },
		// { label: "Resources", value: "resources" },
		// { label: "Map", value: "map" }
	]
	
	return (
		<header className="flex flex-col gap-3 w-full">
			<div className="grid h-24 p-6 gap-x-2.5 gap-y-2.5 flex-shrink-0 self-stretch grid-rows-1 grid-cols-[minmax(0,1fr)_700px_minmax(0,1fr)]">
				<div className="flex px-3 items-center gap-5 flex-1 self-stretch row-[1/2] col-[1/2]">
					<Image
						src="/clearlogo.png"
						alt="Hack404 Logo"
						width={26}
						height={19}
					/>
					<Link href="/launchpad">
						<h1 className="text-white text-2xl font-(family-name:--font-heading) tracking-[-0.72px] cursor-pointer hover:opacity-80">
							launchpad
						</h1>
					</Link>
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
					<RoundedButton
						color="rgba(48,242,242,0.20)"
						className="flex self-stretch text-wcyan gap-4 pl-4 pr-2"
					>
						Profile
						<Avatar className="w-6 h-6">
							<AvatarImage src={avatarUrl}/>
							<AvatarFallback></AvatarFallback>	
						</Avatar>
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
		</header>
	);
}
