"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

export default function InteractiveGradientBackground() {
	const canvasRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Ensure this runs only on the client
		if (typeof window === "undefined") return;

		// Initialize PIXI application
		let app: PIXI.Application | null = null;
		try {
			app = new PIXI.Application({
				resizeTo: window,
				backgroundAlpha: 0,
			});
		} catch (error) {
			console.error("Failed to initialize PIXI.Application:", error);
			return;
		}

		// Append the PIXI canvas to the DOM
		if (canvasRef.current && app.view) {
			canvasRef.current.appendChild(app.view);
		} else {
			console.error("Canvas container or app.view not found");
			app?.destroy(true, { children: true });
			return;
		}

		// Create a gradient graphics object
		const gradient = new PIXI.Graphics();
		app.stage.addChild(gradient);

		// Function to update the gradient based on mouse position
		const updateGradient = (x: number, y: number) => {
			if (!app || !app.renderer || !app.renderer.view) return; // Ensure the app and renderer are ready
			gradient.clear();
			const canvas = document.createElement("canvas");
			canvas.width = 3;
			canvas.height = 1;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				const imageData = ctx.createImageData(3, 1);
				imageData.data.set([
					74, 50, 176, 255, // Color 1: #4a32b0
					32, 160, 160, 255, // Color 2: #20a0a0
					138, 168, 36, 255, // Color 3: #8aa824
				]);
				ctx.putImageData(imageData, 0, 0);
			}
			const gradientTexture = PIXI.Texture.from(canvas);
			const gradientSprite = new PIXI.Sprite(gradientTexture);
			gradientSprite.width = app.screen.width;
			gradientSprite.height = app.screen.height;
			gradientSprite.x = x - gradientSprite.width / 2;
			gradientSprite.y = y - gradientSprite.height / 2;
			gradient.addChild(gradientSprite);
		};

		// Mouse move event listener
		const handleMouseMove = (e: MouseEvent) => {
			updateGradient(e.clientX, e.clientY);
		};

		window.addEventListener("mousemove", handleMouseMove);

		// Cleanup on component unmount
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			if (app) {
				app.destroy(true, { children: true });
			}
		};
	}, []);

	return <div ref={canvasRef} className="absolute inset-0 -z-10"></div>;
}
