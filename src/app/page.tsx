import SignIn from "./components/sign-in";

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-[0px] row-start-2 items-center sm:items-start">
				<img
					src="FullBlackClear.png"
					alt="hack404 Logo"
					className="w-186 h-auto"
				/>
				<p className="ml-20 text-2xl">
					a toronto based hackathon, coming soon.
				</p>
				<div className="ml-20 mt-1 flex flex-row gap-5">
					<SignIn provider="github" />
					<SignIn provider="google" />
				</div>
			</main>
		</div>
	);
}
