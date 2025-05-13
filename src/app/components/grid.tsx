export default function Grid({ type = "tablet" }: { type?: "mobile" | "tablet" | "desktop" }) {
	console.log(`${type} grid rendered`);
	
	// Define configuration based on type
	const columns = type === "mobile" ? 2 : type === "tablet" ? 4 : 5;
	const padding = type === "desktop" ? "px-[64px]" : "px-6";
	const maxWidthStyle = type === "desktop" ? { maxWidth: `calc(100vh * (7 / 3))` } : undefined;

	return (
		<div
			className={`fixed inset-0 z-10 flex h-screen w-full ${padding} gap-6`}
			style={maxWidthStyle}
		>
			{Array.from({ length: columns }).map((_, i) => (
				<div
					key={i}
					className={`flex-1 ${type === "tablet" ? (i < 2 ? "border-x" : "") : "border-x"}`}
					style={{ borderColor: "rgba(48, 242, 242, 0.2)" }}
				/>
			))}
		</div>
	);
}
