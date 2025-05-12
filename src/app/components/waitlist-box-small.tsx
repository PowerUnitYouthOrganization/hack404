import { forwardRef, useImperativeHandle, useState } from "react";

export type WaitlistBoxRef = {
	getEmail: () => String;
};

const WaitlistBox = forwardRef((_, ref) => {
	const [email, setEmail] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	useImperativeHandle(ref, () => ({
		getEmail: () => email,
	}));

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
				className="w-full py-4 pl-0 text-white bg-transparent border-2 border-transparent rounded-md outline-none"
			/>
			<div className="absolute gap-1.5 w-full pointer-events-none">
				<span
					className={`relative text-white transition-opacity ${email || isFocused ? "opacity-0" : "opacity-100"}`}
				>
					Join our waitlist —
				</span>
				<span
					className={`relative text-[#C3F73A] transition-opacity ${email || isFocused ? "opacity-0" : "opacity-100"}`}
				>
					enter your email
				</span>
			</div>
		</div>
	);
});

export default WaitlistBox;
