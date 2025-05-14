export default function Grid() {
	console.log("responsive grid rendered");
	
	return (
		<div
			className="fixed inset-0 z-10 flex h-screen w-full px-6 lg:px-[64px] gap-6 max-w-full lg:max-w-[calc(100vh*(7/3))]"
		>
			{/* Mobile: 2 columns, Tablet: 4 columns, Desktop: 5 columns */}
			<div className="flex-1 border-x sm:hidden md:hidden" style={{ borderColor: "rgba(48, 242, 242, 0.2)" }} />
			<div className="flex-1 border-x" style={{ borderColor: "rgba(48, 242, 242, 0.2)" }} />
			<div className="hidden md:block flex-1 border-x" style={{ borderColor: "rgba(48, 242, 242, 0.2)" }} />
			<div className="hidden md:block flex-1 border-x md:border-none" style={{ borderColor: "rgba(48, 242, 242, 0.2)" }} />
			<div className="hidden lg:block flex-1 border-x" style={{ borderColor: "rgba(48, 242, 242, 0.2)" }} />
		</div>
	);
}
