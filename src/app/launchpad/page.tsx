import DashboardHeader from "@/components/launchpad/launchpad-header";
import GradientBackground from "@/components/gradient-background";
import LaunchpadContainer from "@/components/launchpad/launchpad-container";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

/**
 * This component serves as the main layout for the hacker dashboard page.
 * @returns Launchpad component
 */
export default function Launchpad() {

	const upcomingEvents = [
    {
        name: "Burger Cooking Workshop",
        startTime: new Date("2025-05-28T01:00:00"),
        endTime: new Date("2025-05-28T02:00:00"),
        roomNumber: "2048"
    },
    {
				name: "karaoke",
				startTime: new Date("2025-05-28T03:00:00"),
				endTime: new Date("2025-05-28T04:00:00"),
				roomNumber: "1010"
		},
		{
				name: "intro to prompt eng",
				startTime: new Date("2025-05-28T05:00:00"),
				endTime: new Date("2025-05-28T06:00:00"),
				roomNumber: "5023"
		},
		{
				name: "get emma's phone number",
				startTime: new Date("2025-05-29T01:00:00"),
				endTime: new Date("2025-05-29T02:00:00"),
				roomNumber: "6969"
    },
		{
				name: "get emmwlsdkmclsdkcm's phone number",
				startTime: new Date("2025-05-29T01:00:00"),
				endTime: new Date("2025-05-29T02:00:00"),
				roomNumber: "6969"
		},
 		{
				name: "get emma's phone nuldkmsder",
				startTime: new Date("2025-05-29T01:00:00"),
				endTime: new Date("2025-05-29T02:00:00"),
				roomNumber: "6969"
		}
];

	return (
		<div className="flex flex-col h-screen gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
			<GradientBackground />
			<DashboardHeader />
			<main className="flex flex-col items-start gap-9 flex-1 self-stretch overflow-y-hidden">
				<div className="flex px-9 justify-between items-end self-stretch">
					<div className="flex flex-col justify-center items-start">
						<h1 className="text-[40px] leading-normal font-(family-name:--font-heading-light)">Hello firstname!</h1>
						<sub className="text-wcyan font-light text-sm">Welcome to Hack404</sub>
					</div>
					<div className="flex flex-col justify-center items-end">
						{/* TODO: update time accordingly */}
						<h1 className="text-[40px] leading-normal font-(family-name:--font-heading-light)">time</h1>
						<sub className="text-wcyan font-light text-sm">until submission deadline</sub>
					</div>
				</div>
				<div className="flex px-2 items-start gap-2 flex-1 self-stretch border border-[rgba(48,242,242,0.2)]">
					<LaunchpadContainer
						title="Upcoming Events"
						icon={<CalendarMonthIcon />}
						events={upcomingEvents}
					/>
					<div className="flex pt-6 flex-col items-start gap-6 flex-1 self-stretch border-x border-[rgba(48,242,242,0.2)] backdrop-blur-[25px]"></div>
					<div className="flex pt-6 flex-col items-start gap-6 flex-1 self-stretch border-x border-[rgba(48,242,242,0.2)] backdrop-blur-[25px]"></div>
					<div className="flex pt-6 flex-col items-start gap-6 flex-1 self-stretch border-x border-[rgba(48,242,242,0.2)] backdrop-blur-[25px]"></div>
				</div>
			</main>
		</div>
	);
}
