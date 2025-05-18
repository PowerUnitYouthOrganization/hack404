import { useState } from "react";

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
				className="w-full rounded-md border-2 border-transparent bg-transparent py-4 pl-0 text-2xl text-white outline-none [@media(max-width:1150px)]:text-base"
			/>
			<div className="gap-1.15 pointer-events-none absolute top-0 left-0 flex h-full w-full items-center pl-6">
				<span
					className={`relative text-2xl text-white transition-opacity ${
						email || isFocused ? "opacity-0" : "opacity-100"
					} [@media(max-width:1150px)]:text-base`}
				>
					{submitted ? "Thanks for joining, stay tuned!" : "Join our waitlist"}
					<span className="mx-1 inline-block">—</span>
				</span>
				{!submitted && (
					<span
						className={`relative text-2xl text-[#C3F73A] transition-opacity ${
							email || isFocused ? "opacity-0" : "opacity-100"
						} [@media(max-width:1150px)]:text-base`}
					>
						enter email
					</span>
				)}
			</div>
		</div>
	);
}
