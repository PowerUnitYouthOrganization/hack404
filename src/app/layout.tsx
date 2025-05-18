import { Space_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Space Grotesk was defined but not used - removed

const spaceMono = Space_Mono({
	weight: "400",
	variable: "--font-space-mono",
	subsets: ["latin"],
});

const dmSans = DM_Sans({
	weight: ["400", "500", "700"],
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

export const metadata = {
	title: "Hack404",
	description:
		"Hack404 is a Toronto-based hackathon launching Summer 2025. Join the waitlist and be part of the innovation.",
	keywords: [
		"hackathon",
		"coding",
		"developers",
		"tech events",
		"programming competition",
		"hack404",
		"toronto hackathons",
		"2025 hackathons",
	],
	authors: [{ name: "Hack404 Team" }],
	openGraph: {
		title: "Hack404",
		description:
			"Hack404 is a Toronto-based hackathon launching Summer 2025. Join the waitlist and be part of the innovation.",
		url: "https://hack404.dev",
		siteName: "Hack404",
		images: [
			{
				url: "https://hack404.dev/embedthumbnail.png",
				alt: "Hack404 - Hackathon Platform",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Hack404 | A Toronto based hackathon",
		description: "A Toronto-based hackathon for students of all skill levels.",
		images: ["https://hack404.dev/embedthumbnail.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${dmSans.variable} ${spaceMono.variable} antialiased`}
				suppressHydrationWarning={true}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
