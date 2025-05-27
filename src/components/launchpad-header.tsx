import { Button } from "@/components/ui/button";
import Image from "next/image";
import QrCodeIcon from '@mui/icons-material/QrCode';
import ProfileIcon from '@mui/icons-material/AccountCircle';

export default function LaunchpadHeader() {
	return (
		<header className="grid h-24 p-6 gap-x-2.5 gap-y-2.5 flex-shrink-0 self-stretch grid-rows-1 grid-cols-[minmax(0,1fr)_700px_minmax(0,1fr)]">
			<div className="flex px-3 items-center gap-5 flex-1 self-stretch row-[1/2] col-[1/2]">
				<Image
					src="/clearlogo.png"
					alt="Hack404 Logo"
					width={26}
					height={19}
				/>
				<h1 className="text-white text-2xl font-normal tracking-[-0.72px]">launchpad</h1>
			</div>
			{/* navbar */}
			<div className="flex px-[22px] flex-col justify-center items-center gap-[10px] flex-1 self-stretch col-[2/3] row-[1/2]">
				<nav className="flex p-1 items-center gap-[4px] rounded-[8px] bg-[rgba(48,242,242,0.20)] backdrop-blur-[25px] grow">
					{/* the buttons 
					TODO: Add checker for active button and change the variant accordingly
					*/}
					<Button variant="launchpad-active">Home</Button>
					<Button variant="launchpad-inactive">Agenda</Button>
					<Button variant="launchpad-inactive">Mentor</Button>
					<Button variant="launchpad-inactive">Resources</Button>
					<Button variant="launchpad-inactive">Help</Button>
				</nav>
			</div>
			{/* profile and qr code buttons */}
			<div className="flex justify-end items-center gap-1 flex-1 self-stretch row-[1/2] col-[3/4]">
				{/* change to shadcn buttons later */}
				<div className="flex p-1 items-center gap-1 self-stretch rounded-[100px] bg-[rgba(48,242,242,0.20)] backdrop-blur-[25px]">
					{/* profile button */}
					<button className="flex px-2 py-2 pl-4 justify-center items-center gap-4 self-stretch rounded-[100px] bg-[rgba(48,242,242,0.20)]">
						{/* Profile Icon */}
						Profile
						{/* Change to pfp (? probably the one they create themselves) */}
						<ProfileIcon className="text-white" />
					</button>
				</div>
				<div className="flex p-1 items-center gap-1 self-stretch rounded-[100px] bg-[rgba(48,242,242,0.20)] backdrop-blur-[25px]">
					{/* QR Code button */}
					<button className="flex pr-3 py-2 pl-4 justify-center items-center gap-4 self-stretch rounded-[100px] bg-[#C3F73A] text-black font-light">
						{/* QR Code Icon */}
						QR Code
						<QrCodeIcon className="text-black"/>
					</button>
				</div>
			</div>
		</header>
	);
}
