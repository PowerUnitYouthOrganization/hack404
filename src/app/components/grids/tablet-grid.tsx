export default function Grid() {
	return (
		<div className="fixed inset-0 z-10 flex h-screen w-full px-6 gap-6">
			{Array.from({ length: 4 }).map((_, i) => (
				<div
					key={i}
					className={`flex-1 ${i < 2 ? "border-x" : ""}`}
					style={i < 2 ? { borderColor: "rgba(48, 242, 242, 0.2)" } : undefined}
				/>
			))}
		</div>
	);
}
