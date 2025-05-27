import LaunchpadHeader from "@/components/launchpad/launchpad-header";
import GradientBackground from "@/components/gradient-background";
import LaunchpadContainer from "@/components/launchpad/launchpad-container";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

/**
 * This component serves as the main layout for the hacker dashboard page.
 * @returns Launchpad component
 */
export default function Launchpad() {
	// could probably be moved to json or something
	const agenda = [
		{
			name: "Burger Cooking Workshop",
			startTime: new Date("2025-05-28T01:00:00"),
			endTime: new Date("2025-05-28T02:00:00"),
			roomNumber: "2048",
		},
		{
			name: "karaoke",
			startTime: new Date("2025-05-28T03:00:00"),
			endTime: new Date("2025-05-28T04:00:00"),
			roomNumber: "1010",
		},
		{
			name: "intro to prompt eng",
			startTime: new Date("2025-05-28T05:00:00"),
			endTime: new Date("2025-05-28T06:00:00"),
			roomNumber: "5023",
		},
		{
			name: "get emma's phone number",
			startTime: new Date("2025-05-29T01:00:00"),
			endTime: new Date("2025-05-29T02:00:00"),
			roomNumber: "6969",
		},
		{
			name: "get emmwlsdkmclsdkcm's phone number",
			startTime: new Date("2025-05-29T01:00:00"),
			endTime: new Date("2025-05-29T02:00:00"),
			roomNumber: "6969",
		},
		{
			name: "get emma's phone nuldkmsder",
			startTime: new Date("2025-05-29T01:00:00"),
			endTime: new Date("2025-05-29T02:00:00"),
			roomNumber: "6969",
		},
	];

	return (
		<div className="flex flex-col h-screen gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
			<GradientBackground />
			<LaunchpadHeader />
			<main className="flex flex-col items-start gap-9 flex-1 self-stretch overflow-y-hidden">
				<div className="flex px-9 justify-between items-end self-stretch">
					<div className="flex flex-col justify-center items-start">
						<h1 className="text-[40px] leading-normal font-(family-name:--font-heading-light)">
							Hello firstname!
						</h1>
						<sub className="text-wcyan font-light text-sm">
							Welcome to Hack404
						</sub>
					</div>
					<div className="flex flex-col justify-center items-end">
						{/* TODO: update time accordingly */}
						<h1 className="text-[40px] leading-normal font-(family-name:--font-heading-light)">
							time
						</h1>
						<sub className="text-wcyan font-light text-sm">
							until submission deadline
						</sub>
					</div>
				</div>
				<div className="flex px-2 items-start gap-2 flex-1 self-stretch border border-[rgba(48,242,242,0.2)]">
					<LaunchpadContainer
						title="Agenda"
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="20px"
								viewBox="0 -960 960 960"
								width="20px"
								fill="#e3e3e3"
							>
								<path d="M228.31-116q-27.01 0-45.66-19Q164-154 164-180.31v-503.38Q164-710 182.65-729q18.65-19 45.66-19h87.38v-100.61h53.54V-748h223.08v-100.61h52V-748h87.38q27.01 0 45.66 19Q796-710 796-683.69v503.38Q796-154 777.35-135q-18.65 19-45.66 19H228.31Zm0-52h503.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-335.38H216v335.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM216-567.69h528v-116q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H228.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v116Zm0 0V-696v128.31Zm264.21 186.77q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.04 0-12.9 9.13-22.25 9.14-9.34 22.04-9.34 12.9 0 22.25 9.13 9.34 9.14 9.34 22.04 0 12.91-9.13 22.25-9.14 9.35-22.04 9.35Zm-156 0q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.04 0-12.9 9.13-22.25 9.14-9.34 22.04-9.34 12.9 0 22.25 9.13 9.34 9.14 9.34 22.04 0 12.91-9.13 22.25-9.14 9.35-22.04 9.35Zm312 0q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.04 0-12.9 9.13-22.25 9.14-9.34 22.04-9.34 12.9 0 22.25 9.13 9.34 9.14 9.34 22.04 0 12.91-9.13 22.25-9.14 9.35-22.04 9.35ZM480.21-240q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.03 0-12.91 9.13-22.25 9.14-9.35 22.04-9.35 12.9 0 22.25 9.14 9.34 9.13 9.34 22.04 0 12.9-9.13 22.24-9.14 9.35-22.04 9.35Zm-156 0q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.03 0-12.91 9.13-22.25 9.14-9.35 22.04-9.35 12.9 0 22.25 9.14 9.34 9.13 9.34 22.04 0 12.9-9.13 22.24-9.14 9.35-22.04 9.35Zm312 0q-12.9 0-22.25-9.14-9.34-9.13-9.34-22.03 0-12.91 9.13-22.25 9.14-9.35 22.04-9.35 12.9 0 22.25 9.14 9.34 9.13 9.34 22.04 0 12.9-9.13 22.24-9.14 9.35-22.04 9.35Z" />
							</svg>
						}
						events={agenda}
					/>
					<div className="flex pt-6 flex-col items-start gap-6 flex-1 self-stretch border-x border-[rgba(48,242,242,0.2)] backdrop-blur-[25px]"></div>
					<div className="flex pt-6 flex-col items-start gap-6 flex-1 self-stretch border-x border-[rgba(48,242,242,0.2)] backdrop-blur-[25px]"></div>
					<div className="flex pt-6 flex-col items-start gap-6 flex-1 self-stretch border-x border-[rgba(48,242,242,0.2)] backdrop-blur-[25px]"></div>
				</div>
			</main>
		</div>
	);
}
