import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
});

const spaceMono = Space_Mono({
	weight: "400",
	variable: "--font-space-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Hack404",
	description: "Hackathon landing page",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
