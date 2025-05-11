export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[0px] row-start-2 items-center sm:items-start">
				<img
					src="FullBlackClear.png"
					alt="hack404 Logo"
					className="w-186 h-auto"
				/>
				<p className="ml-20 text-2xl">
					a toronto based hackathon, coming soon.
				</p>
			</main>
		</div>
	);
}
