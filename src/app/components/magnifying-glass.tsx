/* "use client";

import { useState, useEffect } from "react";

export default function MagnifyingGlass() {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setPosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<div
			className="magnifying-glass"
			style={{
				top: position.y,
				left: position.x,
				zIndex: 100, // Ensure it is above other elements
			}}
		></div>
	);
}

*/