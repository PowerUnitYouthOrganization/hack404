"use client";

import Header from "./components/header";
import { IoMdArrowForward } from "react-icons/io";
import GradientBorder from "./components/gradient-border";
import Grid from "./components/grid";
import HBorder from "./components/h-border";
import GradientBackground from "./components/gradient-background";
import { useState } from "react";

export default function Home() {
	const [email, setEmail] = useState("");
	const [placeholder, setPlaceholder] = useState("enter your email");
	const [isFocused, setIsFocused] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async () => {
		const emailToSubmit = email || "default@example.com"; // Use default email if input is empty
		const timestamp = new Date().toISOString(); // Variable to log the timestamp of submission
		console.log(`Submit button pressed at: ${timestamp}`); // Print the variable

		try {
			const response = await fetch("/api/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: emailToSubmit }),
			});
			if (response.ok) {
				alert("Email added to the waitlist!");
				setEmail(""); // Clear the input
				setPlaceholder("Check your inbox!"); // Update placeholder
			} else {
				alert("Failed to add email. Please try again.");
			}
		} catch (error) {
			console.error(error);
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex flex-col relative">
			{/* Interactive gradient background */}
			<GradientBackground />

			{/* Grid background */}
			<div className="z-50">
				<Grid />
			</div>

			{/* Header */}
			<Header />
			<HBorder />
			<div className="flex-1 flex flex-col gap-8 items-center sm:items-start text-center sm:text-left z-50">
				<div className="flex-1 flex flex-col p-[64px] justify-between items-start">
					<div className="flex justify-between items-start self-stretch">
						<h1 className="text-white font-[300] text-[48px] leading-[110%] tracking-[-1.44px] font-(family-name:--font-heading-light)">
							a toronto based <br /> hackathon
						</h1>
						<img
							src="whitesmall.png"
							alt=""
							className="h-[80px] w-auto flex-shrink-0"
						/>
					</div>
					<img
						src="whitetext.png"
						alt="hack404 big label"
						className="h-auto w-full"
					/>
				</div>
			</div>

			{/* Horizontal border */}
			<HBorder />

			{/* Gradient border */}
			<GradientBorder reverse={true} />

			{/* Footer */}
			<footer className="homepage-footer">
				<h1 className="text-2xl w-[300px] mr-40 text-white font-(family-name:--font-heading)">
					Coming soon <br /> July 2025
				</h1>
				{/* Waitlist input box */}
				<div className="waitlist-input-box relative z-10">
					<div className="flex items-center gap-2">
						<span
							className={`placeholder:text-2xl text-2xl text-white font-(family-name:--font-heading-light) ${
								isFocused || email ? "hidden" : ""
							}`}
						>
							Join our waitlist —
						</span>
						<input
							type="email"
							placeholder={placeholder}
							className="bg-transparent outline-none text-2xl text-white font-(family-name:--font-heading-light)"
							value={email}
							onChange={handleInputChange}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
						/>
					</div>
				</div>

				{/* Submit button */}
				<div className="relative flex items-center justify-center w-[477px] h-[78px] group">
					<svg
						className="absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-200"
						xmlns="http://www.w3.org/2000/svg"
						width="282"
						height="78"
						viewBox="0 0 282 78"
						fill="none"
					>
						<path
							d="M282 53.8579C282 56.51 280.946 59.0536 279.071 60.9289L264.929 75.0711C263.054 76.9464 260.51 78 257.858 78H0V0H277C279.761 0 282 2.23858 282 5V53.8579Z"
							fill="white"
						/>
					</svg>
					<div className="relative z-10 flex items-center justify-between gap-4 text-2xl text-black w-full mx-[24px] font-(family-name:--font-heading)">
						<p>Submit</p>
						<IoMdArrowForward size={24} />
					</div>
					{/* Ensure the button is clickable */}
					<button
						className="absolute inset-0 z-40 w-full h-full bg-transparent cursor-pointer"
						onClick={() => {
							console.log("Button pressed"); // Log button press
							handleSubmit();
						}}
						aria-label="Submit email"
					/>
				</div>
			</footer>
		</div>
	);
}
