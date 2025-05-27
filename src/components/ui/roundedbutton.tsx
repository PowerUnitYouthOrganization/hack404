import { Button } from "./button";

export default function RoundedButton({
	children,
	color = "",
	className = "",
	disabled = false,
}: {
	children: React.ReactNode;
	color?: string;
	className?: string;
	disabled?: boolean;
}) {
	return (
		<div className="flex p-1 items-center gap-1 self-stretch rounded-[100px] bg-[rgba(48,242,242,0.20)] backdrop-blur-[25px]">
			<Button
				variant="rounded"
				className={`bg-[${color}] ${className}`}
				disabled={disabled}
			>
				{children}
			</Button>
		</div>
	);
}
