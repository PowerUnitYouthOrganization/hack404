export default function Leaderboard() {
	return (
		<div className="flex flex-col items-start flex-1">
			<div className="flex px-6 py-6 justify-center items-center gap-2.5 self-stretch bg-inherit backdrop-blur-[25px] border-b border-t border-[rgba(48,242,242,0.2)] sticky top-0 z-10 flex-shrink-0">
				<h1 className="flex-1 text-white font-light">
					Leaderboard
				</h1>
				</div>
			<div
				className={`flex flex-col items-start justify-between self-stretch p-6 border-b border-[rgba(48, 242, 242, 0.20)] bg-[rgba(48, 242, 242, 0.10)] backdrop-blur-[25px] last:border-b-0 flex-shrink-0`}
			>
				{/* Event Header */}
				<div className="flex justify-between items-start self-stretch">
					<div className="flex flex-col items-start gap-2">
						<h2 className="font-medium">Coming soon!</h2>
					</div>
				</div>
				{/* Event Details */}
				<div className="flex justify-between items-end self-stretch">
				</div>
			</div>
		</div>
	);
}
