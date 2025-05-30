import React from "react";

interface SubmitButtonProps {
  text: string;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function CutButton({
  text,
  onClick,
  disabled = false,
  className = "",
  style = {},
}: SubmitButtonProps) {
  return (
    <button
      className={`flex items-stretch justify-start ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {/* Submit button - show text for tablet and desktop only */}
      <p className={`tablet:flex bg-white desktop:w-44 desktop:text-2xl hidden items-center justify-start pl-6 text-black flex-grow rounded-[inherit]`}>
        {text}
      </p>
      <img
        className="h-full"
        src="button.svg"
        alt="submit button arrow"
      />
    </button>
  );
}
