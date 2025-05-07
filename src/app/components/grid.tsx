export default function Grid() {
	return (
		<div className="fixed inset-0 -z-10 flex h-screen w-full px-[64px] gap-[24px]">
			{Array.from({ length: 5 }).map((_, i) => (
				<div key={i} className="flex-1 border-x border-white opacity-25" />
			))}
		</div>
	);
}
