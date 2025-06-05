import Header from "@/components/header";
import ColSection from "@/components/col-section";
import SmallHeader from "@/components/small-header";
import GradientBorder from "@/components/gradient-border";
import Grid from "@/components/grid";
import HBorder from "@/components/h-border";
import GradientBackground from "@/components/gradient-background";
import WaitlistBox from "../../components/waitlist-box";
import CutButton from "@/components/cut-button";
import { useGridColWidth } from "../contexts/GridCtx";
import Image from "next/image";

type LayoutProps = {
	handleSubmit: () => void | Promise<void>;
};

export default function ResponsiveLayout({ handleSubmit }: LayoutProps) {
	console.log("responsive layout rendered");

	return (
		<>
			<div className="relative">
				<div className="relative flex min-h-screen flex-col">
					{/* Header: different components for desktop vs mobile/tablet */}
					<div className="desktop:block hidden">
						<Header />
					</div>
					<div className="desktop:hidden block">
						<SmallHeader />
					</div>

					{/* Grid and background */}
					<div className="-z-20">
						<Grid />
					</div>
					<div className="black-screen" />
					<GradientBackground />

					<HBorder />

					{/* Main content section */}
					<div className="desktop:p-[64px] flex flex-1 flex-col items-start justify-between gap-8 p-6 text-left text-white">
						<img
							src="whitetext.png"
							alt="hack404 big label"
							className="h-auto w-full"
						/>
						<div className="flex items-start justify-between self-stretch">
							<ColSection width={1}>
								<img
									src="whitesmall.png"
									alt=""
									className="h-auto w-14"
								/>
							</ColSection>
							<ColSection width={2}>
								<p className="size-5 w-full">
									{
										"A 36-hour hackathon based in Toronto where secondary and post-secondary students, from first-time hackers to seasoned builders, team up to solve real-world problems and shape tomorrow's technology."
									}
								</p>
							</ColSection>
							<ColSection width={1} />
							<ColSection width={1}>
								<CutButton
									text="Sign up now"
									onClick={handleSubmit}
									disabled={false}
									className="rounded-l-sm w-full"
								/>
							</ColSection>
						</div>
						<div className="flex items-start self-stretch">
							<ColSection width={1} offset="1.5rem">
								July 4 - 6, 2025
							</ColSection>
							<ColSection width={1} offset="1.5rem">
								Greater Toronto Area
							</ColSection>
							<ColSection width={1} offset="1.5rem">

							</ColSection>
							<ColSection width={1} offset="1.5rem">

							</ColSection>
							<ColSection width={1}>
								<p className="text-right">
									Presented by <br />
									Power Unit Youth Organization
								</p>
							</ColSection>
						</div>
					</div>

					{/* Banner Image Section - positioned to compress first half */}
					<div className="relative w-full overflow-hidden">
						<img
							src="https://images.unsplash.com/photo-1698957921407-bf292bcacf5e"
							alt="Toronto skyline at night"
							className="h-auto px-16"
						/>
					</div>
				</div>

				{/* Mask element positioned exactly at 100vh to cover gradient background */}
				<div className="absolute top-[100vh] left-0 right-0 bottom-0 bg-background -z-10" />
			</div>

			{/* ========================= SECOND HALF OF PAGE ========================= */}
			{/* About page and contact page (second screen) */}
			<div
				id="about-us"
				className=" relative flex min-h-screen flex-col justify-between"
			>
				<div className="flex flex-col items-start justify-between text-left text-white">
					{/* about us */}
					<div className="bg-background absolute inset-0 -z-30" />
					<div className="tablet:flex-row tablet:gap-6 tablet:px-[24px] tablet:py-[64px] desktop:px-[64px] desktop:py-[70px] flex shrink-0 flex-col items-start gap-12 px-[24px] py-[30px]">
						<ColSection width={1}>
							<Image
								src="/whitesmall.png"
								alt=""
								width={56}
								height={42}
								className="h-auto w-14"
							/>
						</ColSection>
						<ColSection width={2}>
              <p className="text-white text-justify text-xl font-extralight leading-[110%] tracking-[-0.2px]">
                A 36-hour hackathon based in Toronto where
                secondary and post-secondary students, from
                first-time hackers to seasoned builders, team up
                to solve real-world problems and shape
                tomorrow's technology.
              </p>
						</ColSection>
						{/* there is DEFINITELY a better way to do this but im too tired */}
            {/* spacer */}
            <ColSection width={1}></ColSection>
            <ColSection width={1}>
								<CutButton
									text="Sign up now"
									onClick={handleSubmit}
									disabled={false}
									className="rounded-l-sm w-full"
								/>
							</ColSection>
					</div>
					<HBorder />
				</div>
			</div>
		</>
	);
}
