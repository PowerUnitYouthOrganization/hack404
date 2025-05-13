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

export default function WaitlistBox({ onEmailChange }: WaitlistBoxProps) {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (onEmailChange) {
      onEmailChange(newEmail);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
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
			<div className="absolute gap-1.5 w-full pointer-events-none">
				<span
					className={`relative text-2xl transition-opacity text-white ${
						email || isFocused ? "opacity-0" : "opacity-100"
					} [@media(max-width:1150px)]:text-base`}
				>
					{submitted
						? "Thanks for joining, stay tuned!"
						: "Join our waitlist —"}
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
