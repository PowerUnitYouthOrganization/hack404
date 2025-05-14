import { useEffect, useRef, useState } from "react";

export default function Grid({
	onLinkWidth,
}: {
	onLinkWidth?: (w: number) => void;
}) {

	// Breakpoints for different screen sizes
	// mobile: 0px - 639px
	// tablet: 640px - 1023px
	// desktop: 1024px+

	const [type, setType] = useState("desktop"); // default to desktop

	useEffect(() => {
		const updateType = () => {
			if (typeof window !== "undefined") {
				const width = window.innerWidth;
				if (width < 640) setType("mobile");
				else if (width < 1024) setType("tablet");
				else setType("desktop");
			}
		};

		updateType(); // initial call
		window.addEventListener("resize", updateType);
		return () => window.removeEventListener("resize", updateType);
	}, []);

	console.log(`${type} grid rendered`);
	const elementRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateWidth = () => {
			if (elementRef.current && onLinkWidth) {
				onLinkWidth(elementRef.current.offsetWidth);
			}
		};

		updateWidth(); // initial call
		window.addEventListener("resize", updateWidth);
		return () => window.removeEventListener("resize", updateWidth);
	}, [onLinkWidth]);

	// Define configuration based on type
	const columns = type === "mobile" ? 2 : type === "tablet" ? 4 : 5;
	const padding = type === "desktop" ? "px-[64px]" : "px-6";
	const maxWidthStyle =
		type === "desktop" ? { maxWidth: `calc(100vh * (7 / 3))` } : undefined;

	return (
		<div
			className={`fixed inset-0 z-10 flex h-screen w-full ${padding} gap-6`}
			style={maxWidthStyle}
		>
			{Array.from({ length: columns }).map((_, i) => (
				<div
					key={i}
					className="flex-1 border-x"
					style={{ borderColor: "rgba(48, 242, 242, 0.2)" }}
					ref={elementRef}
				/>
			))}
		</div>
	);
}