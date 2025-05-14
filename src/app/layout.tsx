import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
	description: "A Toronto-based hackathon. Sign up today!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`dm-sans ${spaceMono.variable} antialiased`}
				suppressHydrationWarning={true}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
