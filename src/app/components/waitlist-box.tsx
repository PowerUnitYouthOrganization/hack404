import { useState, useEffect } from "react";

type WaitlistProps = {
	email: string;
	setEmail: (email: string) => void;
	submitted: boolean;
};

export default function WaitlistBox({
	email,
	setEmail,
	submitted,
}: WaitlistProps) {
	const [isFocused, setIsFocused] = useState(false);

	const handleChange = (e: any) => {
		setEmail(e.target.value);
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	return (
		<div className="waitlist relative">
			<input
				type="email"
				value={email}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder=""
				disabled={submitted}
				className="w-full py-4 pl-0 text-2xl text-white bg-transparent border-2 border-transparent rounded-md outline-none  [@media(max-width:1150px)]:text-base"
			/>
			<div className="absolute top-0 left-0 gap-1.15 w-full h-full flex items-center pointer-events-none pl-6">
				<span
					className={`relative text-2xl transition-opacity text-white ${
						email || isFocused ? "opacity-0" : "opacity-100"
					} [@media(max-width:1150px)]:text-base`}
				>
					{submitted ? "Thanks for joining, stay tuned!" : "Join our waitlist"}
					<span className="inline-block mx-1">—</span>
				</span>
				{!submitted && (
					<span
						className={`relative text-2xl text-[#C3F73A] transition-opacity ${
							email || isFocused ? "opacity-0" : "opacity-100"
						} [@media(max-width:1150px)]:text-base`}
					>
						enter your email
					</span>
				)}
			</div>
		</div>
	);
}
