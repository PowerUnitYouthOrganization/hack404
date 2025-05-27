import DashboardHeader from "@/components/launchpad-header";
import GradientBackground from "@/components/gradient-background";

/**
 * This component serves as the main layout for the hacker dashboard page.
 * @returns Launchpad component
 */
export default function Launchpad() {
	return (
		<div className="flex flex-col h-screen gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
			<GradientBackground />
			<DashboardHeader />
			<main className="flex flex-col items-start gap-9 flex-1 self-stretch overflow-y-hidden">
				<div className="flex px-9 justify-between items-end self-stretch">
					<div className="flex-col justify-center items-start">
						<h1>Hello firstname!</h1>
						<sub>Welcome to Hack404</sub>
					</div>
				</div>
				<div className="flex px-2 items-start gap-2 flex-1 self-stretch border border-[rgba(48,242,242,0.2)]">
					<div className="flex pt-6 flex-col items-start gap-6 flex-1 self-stretch border-x border-[rgba(48,242,242,0.2)] backdrop-blur-[25px]"></div>
					<div className="flex pt-6 flex-col items-start gap-6 flex-1 self-stretch border-x border-[rgba(48,242,242,0.2)] backdrop-blur-[25px]"></div>
					<div className="flex pt-6 flex-col items-start gap-6 flex-1 self-stretch border-x border-[rgba(48,242,242,0.2)] backdrop-blur-[25px]"></div>
				</div>
			</main>
		</div>
	);
}
