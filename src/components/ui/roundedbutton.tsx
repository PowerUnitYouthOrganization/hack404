import { Button } from "./button";

export default function RoundedButton({
  children,
  color = "",
  className = "",
  disabled = false,
  type = "button",
  form,
  onClick = () => {
    console.warn("RoundedButton clicked but no onClick handler provided.");
  },
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  form?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`flex p-1 items-center gap-1 rounded-[100px] bg-[rgba(48,242,242,0.20)] backdrop-blur-[25px] h-14`}
    >      <button
        type={type}
        form={form}
        className={`h-12 w-full flex pr-3 py-2 pl-4 justify-center items-center gap-4 text-[16px] rounded-[100px] font-light cursor-pointer ${className} transition-all hover:brightness-110`}
        disabled={disabled}
        style={{ backgroundColor: color }}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
