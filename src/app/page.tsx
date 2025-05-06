export default function LandingPage() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="flex justify-between w-full px-8 sm:px-20 text-lg">
                <div className="flex gap-8">
                    <button className="hover:underline">About us</button>
                    <button className="hover:underline">Instagram</button>
                </div>
                <div className="flex gap-8">
                    <button className="hover:underline">Sponsor us</button>
                    <button className="hover:underline">Join waitlist</button>
                </div>
            </header>

            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left">
                <h1 className="text-8xl font-[FH Lecturis Rounded]">hack404</h1>
                <p className="text-2xl font-[var(--font-space-grotesk)]">
                    hackathon tagline goes here
                </p>
                <p className="text-lg font-[var(--font-space-grotesk)]">
                    Coming soon <br /> Summer 2025
                </p>
            </main>

            <footer className="flex flex-col items-center gap-4 w-full px-8 sm:px-20">
                <p className="text-lg font-[var(--font-space-grotesk)]">
                    Join our waitlist — enter your email
                </p>
                <div className="flex gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                    />
                    <button className="p-2 bg-green-500 text-black rounded hover:bg-green-600">
                        Submit
                    </button>
                </div>
            </footer>
        </div>
    );
}