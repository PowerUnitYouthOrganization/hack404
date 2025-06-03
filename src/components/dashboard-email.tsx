import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";

interface LaunchpadLoginEmailProps {
	username?: string;
	loginLink?: string;
	expiresInMinutes?: number;
}

const customCSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');
  @font-face {
      font-family: 'FH Lecturis';
      src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FHLecturisRounded-Regular-4o0BAsoghq9sl7B7UXJRfPpapMub52.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
  }
  @font-face {
      font-family: 'FH Lecturis';
      src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FHLecturisRounded-Bold-nSd4K1kDP1OIxsJGfKkX5PS0YBjNtX.woff2') format('woff2');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
  }
  @font-face {
      font-family: 'FH Lecturis';
      src: url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FHLecturisRounded-Light-K2n9opf6PfzRcFavmZglLxCumrtEli.woff2') format('woff2');
      font-weight: 300;
      font-style: normal;
      font-display: swap;
  }
`;

// Note: React Email has limited Tailwind support, keeping critical styles inline for email compatibility
const inlineStyles = {
	backgroundGradient:
		"url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gradient-CKqj6b1iXKPJKdMeqiSCuMLT0IR4LJ.png')",
	buttonGradient: "linear-gradient(90deg, #181C3A 0%, #1B2B3A 100%)",
	footerGradient: "linear-gradient(to right, #3023AE, #53A0FD, #6DFD9C)",
	verticalLineGradient: "rgba(48, 242, 242, 0.20)",
};

export const LaunchpadLoginEmail = ({
	username = "there",
	loginLink = "https://hack404.dev/login",
	expiresInMinutes = 404,
}: LaunchpadLoginEmailProps) => {
	const previewText = "Ready to see your launchpad?";
	return (
		<Html>
			<Head>
				<style dangerouslySetInnerHTML={{ __html: customCSS }} />
			</Head>
			<Preview>{previewText}</Preview>
			<Body
				className="m-0 bg-[#0e1116] p-0 leading-tight font-light text-white"
				style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
			>
				<Container className="relative mx-auto max-w-[620px] bg-[#0e1116]">
					<div
						className="absolute top-[100px] bottom-0 left-9 w-[0.5px]"
						style={{ background: inlineStyles.verticalLineGradient }}
					></div>
					<div
						className="absolute top-[100px] right-9 bottom-0 w-[0.5px]"
						style={{ background: inlineStyles.verticalLineGradient }}
					></div>
					<Section
						className="h-[100px] bg-cover bg-center px-9"
						style={{ backgroundImage: inlineStyles.backgroundGradient }}
					>
						<Row className="h-[100px] w-full">
							<Column className="w-1/2 text-left align-middle">
								<Img
									src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whitefull-0TRiUOfPxYtvWZSfP5Sd3hwGMpB6xA.png"
									width="135"
									height="21"
									alt="hack404 Logo"
								/>
							</Column>
							<Column
								className="w-1/2 text-right align-middle text-xl leading-none font-light whitespace-nowrap text-white"
								style={{
									fontFamily: "'FH Lecturis', 'DM Sans', Arial, sans-serif",
								}}
							>
								July 4 – 6, 2025 | Toronto, Ontario
							</Column>
						</Row>
					</Section>
					<Section className="bg-[#0e1116] px-9">
						<div className="mt-16 mb-12">
							<Text
								className="m-0 text-4xl leading-none font-normal tracking-[-1.6px] text-white"
								style={{
									fontFamily: "'FH Lecturis', 'DM Sans', Arial, sans-serif",
								}}
							>
								Ready to see your
								<br />
								launchpad?
							</Text>
						</div>
						<Text
							className="mt-6 mb-8 text-[22px] leading-[140%] font-light text-[#30f2f2]"
							style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
						>
							Hey {username}{" "}
							<span role="img" aria-label="wave">
								👋
							</span>
						</Text>
						<Text
							className="m-0 mb-8 text-[22px] leading-[140%] font-light text-[#30f2f2]"
							style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
						>
							Thank you for creating a Hack404 account!
						</Text>
						<Text
							className="m-0 mb-8 text-[22px] leading-[140%] font-light text-[#30f2f2]"
							style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
						>
							Click the button below to login and start your application.
						</Text>
						<div className="my-8 flex justify-center p-0">
							<div
								className="box-border flex w-full items-center rounded-2xl p-0"
								style={{ background: inlineStyles.buttonGradient }}
							>
								<span
									className="flex-1 py-8 pr-0 pl-8 text-[22px] font-normal text-white"
									style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
								>
									Access your account
								</span>
								<a
									href={loginLink}
									className="m-4 flex items-center rounded-[32px] border-0 bg-[#CFFF4A] px-8 py-4 text-xl font-bold text-[#0e1116] no-underline shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]"
									style={{
										fontFamily: "'FH Lecturis', 'DM Sans', Arial, sans-serif",
									}}
									target="_blank"
									rel="noopener noreferrer"
								>
									Log In
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										className="ml-2"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M13 5L20 12L13 19"
											stroke="#0e1116"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M20 12H4"
											stroke="#0e1116"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</a>
							</div>
						</div>
						<Text
							className="mt-10 mr-0 mb-0 ml-0 text-[22px] text-[#30f2f2]"
							style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
						>
							This button will expire in {expiresInMinutes} minutes.
						</Text>
						<Text
							className="m-0 mb-8 text-[22px] leading-[140%] font-light text-[#30f2f2]"
							style={{ fontFamily: "'DM Sans', Arial, sans-serif" }}
						>
							Sincerely,
							<br />
							The Hack404 Team
						</Text>
					</Section>
					<Section className="p-0 pb-8">
						<div
							className="mb-8 h-[2px] w-full"
							style={{ backgroundImage: inlineStyles.footerGradient }}
						></div>
						<div className="px-9">
							<Row>
								<Column className="w-1/3 text-left align-middle">
									<Img
										src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PUYO%20Logo-jCW5IINcDKxVsB5Sx0XNmev4XawyxW.png"
										alt="Power Unit Youth Organization"
										className="inline-block max-h-10 w-auto"
									/>
								</Column>
								<Column className="w-1/3 text-center align-middle">
									<Link
										href="https://hack404.dev"
										className="text-xl font-light tracking-[-0.6px] text-[#30f2f2] no-underline"
										style={{
											fontFamily: "'FH Lecturis', 'DM Sans', Arial, sans-serif",
										}}
									>
										hack404.dev
									</Link>
								</Column>
								<Column className="w-1/3 text-right align-middle">
									<Img
										src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colour%20Logo%20Clear.png-rxDX3o8b4wAZ9PbarkfCLjOcIsSSnP.jpeg"
										alt="hack404 Logo"
										className="inline-block max-h-10 w-auto"
									/>
								</Column>
							</Row>
						</div>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

LaunchpadLoginEmail.PreviewProps = {
	username: "there",
	loginLink: "https://hack404.dev/login",
	expiresInMinutes: 404,
} as LaunchpadLoginEmailProps;

export default LaunchpadLoginEmail;
