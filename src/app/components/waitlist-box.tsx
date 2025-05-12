import { useState } from "react";

export default function WaitlistBox({ email, setEmail }: any) {
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
				className="w-full py-4 pl-0 text-2xl text-white bg-transparent border-2 border-transparent rounded-md outline-none  [@media(max-width:1150px)]:text-base"
			/>
			<div className="absolute gap-1.5 w-full pointer-events-none">
				<span
					className={`relative text-2xl text-white transition-opacity ${email || isFocused ? "opacity-0" : "opacity-100"} [@media(max-width:1150px)]:text-base`}
				>
					Join our waitlist —
				</span>
				<span
					className={`relative text-2xl text-[#C3F73A] transition-opacity ${email || isFocused ? "opacity-0" : "opacity-100"} [@media(max-width:1150px)]:text-base`}
				>
					enter your email
				</span>
			</div>
		</div>
	);
}
