export default function Grid() {
	return (
		<div
			className="fixed inset-0 z-10 flex h-screen w-full px-[64px] gap-6"
			style={{ maxWidth: `calc(100vh * (7 / 3))` }}
		>
			{Array.from({ length: 5 }).map((_, i) => (
				<div
					key={i}
					className="flex-1 border-x"
					style={{ borderColor: "rgba(48, 242, 242, 0.2)" }}
				/>
			))}
		</div>
	);
}
