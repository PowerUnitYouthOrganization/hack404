import { useState, useEffect } from "react";

interface WaitlistBoxProps {
  onEmailChange?: (email: string) => void;
}

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
        className="w-full py-4 pl-0 text-2xl text-white bg-transparent border-2 border-transparent rounded-md outline-none"
      />
      <div className="absolute gap-1.5 w-full pointer-events-none">
        <span
          className={`relative text-2xl text-white transition-opacity ${email || isFocused ? "opacity-0" : "opacity-100"}`}
        >
          Join our waitlist —
        </span>
        <span
          className={`relative text-2xl text-[#C3F73A] transition-opacity ${email || isFocused ? "opacity-0" : "opacity-100"}`}
        >
          enter your email
        </span>
      </div>
    </div>
  );
}
