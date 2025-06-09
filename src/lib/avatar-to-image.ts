export function avatarToCanvas(avatar: string[][]): HTMLCanvasElement {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d")!;

	// Set canvas size (8x8 pixels, scaled up for visibility)
	const pixelSize = 32; // Each pixel will be 32x32 for a 256x256 final image
	canvas.width = 8 * pixelSize;
	canvas.height = 8 * pixelSize;

	// Draw each pixel
	avatar.forEach((row, rowIndex) => {
		row.forEach((color, colIndex) => {
			ctx.fillStyle = color;
			ctx.fillRect(
				colIndex * pixelSize,
				rowIndex * pixelSize,
				pixelSize,
				pixelSize,
			);
		});
	});

	return canvas;
}

/**
 * Converts a canvas element to a Blob in PNG format.
 * @param canvas 
 * @returns A Promise that resolves to a Blob representing the canvas image.
 */
export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
	return new Promise((resolve) => {
		canvas.toBlob((blob) => {
			resolve(blob!);
		}, "image/png");
	});
}
