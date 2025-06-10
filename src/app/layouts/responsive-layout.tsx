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
import { TextSection, TextSectionTitle, TextSectionContent } from "@/components/text-section";
import Image from "next/image";
import { InstagramButton } from "@/components/social-button";

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
            {/* Desktop layout */}
            <div className="hidden desktop:flex desktop:flex-col desktop:gap-8 desktop:w-full">
              <img
                src="whitetext.png"
                alt="hack404 big label"
                className="h-auto w-full"
              />
              <div className="flex items-start justify-between self-stretch">
                <ColSection width={1}>
                  <img src="whitesmall.png" alt="" className="h-auto w-14" />
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
                <ColSection
                  width={1}
                  offset="1.5rem"
                  className="hidden tablet:flex"
                >
                  Greater Toronto Area
                </ColSection>
                <ColSection width={1} offset="1.5rem"></ColSection>
                <ColSection width={1} offset="1.5rem"></ColSection>
                <ColSection width={1}>
                  <p className="text-right">
                    Presented by <br />
                    Power Unit Youth Organization
                  </p>
                </ColSection>
              </div>
            </div>

            {/* Mobile/Tablet layout */}
            <div className="desktop:hidden flex flex-col gap-8 w-full">
              {/* 1. hack404 big text */}
              <img
                src="whitetext.png"
                alt="hack404 big label"
                className="h-auto w-full"
              />

              {/* 2. 36-hour paragraph */}
              <div className="self-stretch">
                <p className="text-justify text-white text-base font-extralight font-['DM_Sans'] leading-none">
                  A 36-hour hackathon based in Toronto where secondary and
                  post-secondary students, from first-time hackers to seasoned
                  builders, team up to solve real-world problems and shape
                  tomorrow's technology.
                </p>
              </div>

              {/* 3. Presented by text */}
              <div className="self-stretch">
                <p className="text-right text-white text-base font-normal font-['DM_Sans'] leading-none">
                  Presented by
                  <br />
                  Power Unit Youth Organization
                </p>
              </div>

              {/* 4. Sign up button */}
              <div className="self-stretch">
                <CutButton
                  text="Sign up now"
                  onClick={handleSubmit}
                  disabled={false}
                  className="rounded-l-sm w-full"
                />
              </div>

              {/* 5. Date and location */}
              <div className="self-stretch flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-white text-base font-normal font-['DM_Sans'] leading-none">
                    July 4 - 6, 2025
                  </p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-white text-base font-normal font-['DM_Sans'] leading-none">
                    Greater Toronto Area
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Image Section - positioned to compress first half */}
          <div className="relative w-full overflow-hidden h-auto px-6 pb-[70px] desktop:px-16 ">
            <img
              src="https://images.unsplash.com/photo-1698957921407-bf292bcacf5e"
              alt="Toronto skyline at night"
              className="rounded-lg" 
            />
          </div>
        </div>

        {/* Mask element positioned exactly at 100vh to cover gradient background */}
        <div className="hidden desktop:block absolute top-[100vh] left-0 right-0 bottom-0 bg-background -z-21" />
        <div className="hidden desktop:block h-[1px] w-screen bg-[rgba(48,242,242,0.2)]"></div>
      </div>

      {/* ========================= SECOND HALF OF PAGE ========================= */}
      {/* About page and contact page (second screen) */}
      <div
        id="about-us"
        className=" relative flex min-h-screen flex-col justify-between"
      >
        <div className="flex flex-col items-start justify-between text-left text-white">          {/* about us */}
          <div className="bg-background absolute inset-0 -z-30" />
          <TextSection titleWidth={1} contentWidth={3}>
            <TextSectionTitle>
              What is <br />
              hack404?
            </TextSectionTitle>
            <TextSectionContent enableGradientWords={true}>
              A 36-hour hackathon based in Toronto where secondary and
              post-secondary students, from first-time hackers to seasoned
              builders, team up to solve real-world problems and shape
              tomorrow's technology.
            </TextSectionContent>
          </TextSection>

          <HBorder />

          <TextSection titleWidth={1} contentWidth={3} className="pb-2 tablet:pb-2 desktop:pb-2">
            <TextSectionTitle>
              Contact
            </TextSectionTitle>
            <TextSectionContent>
              Link to our socials
            </TextSectionContent>
          </TextSection>

          <TextSection titleWidth={1} contentWidth={3} className="pt-2 tablet:pt-2 desktop:pt-2">
            <TextSectionTitle>
              <span className="text-2xl font-normal">
                <GradientBorder>
                    emma.xing@power-unit.org
                </GradientBorder>
              </span>
            </TextSectionTitle>
            <TextSectionContent enableGradientWords={true} as="div">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <InstagramButton 
                    url="https://www.instagram.com/hack404.dev/"
                    size="md"
                  />
                </div>
              </div>
            </TextSectionContent>
          </TextSection>
          <HBorder />
        </div>
      </div>
    </>
  );
}
