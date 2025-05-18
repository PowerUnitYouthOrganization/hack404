import Header from "@/components/header";
import SmallHeader from "@/components/small-header";
import GradientBorder from "@/components/gradient-border";
import Grid from "@/components/grid";
import HBorder from "@/components/h-border";
import GradientBackground from "@/components/gradient-background";
import WaitlistBox from "../../components/waitlist-box";
import { useGridColWidth } from "../contexts/GridCtx";

type LayoutProps = {
  email: string;
  setEmail: (email: string) => void;
  headerBinWidth: number | null;
  setHeaderBinWidth: (value: number | null) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  submitted: boolean;
  setSubmitted: (value: boolean) => void;
  handleSubmit: () => void | Promise<void>;
};

export default function ResponsiveLayout({
  email,
  setEmail,
  headerBinWidth,
  setHeaderBinWidth,
  isSubmitting,
  setIsSubmitting,
  submitted,
  setSubmitted,
  handleSubmit,
}: LayoutProps) {
  console.log("responsive layout rendered");

  // Submit text based on submission state
  const submitText = isSubmitting
    ? "Submitting..."
    : submitted
      ? "Submitted"
      : "Submit";

  const [colWidth] = useGridColWidth(); // Get the column width from context

  return (
    <>
      <div className="relative flex min-h-screen flex-col lg:max-w-[calc(100vh*(7/3))]">
        {/* Header: different components for desktop vs mobile/tablet */}
        <div className="hidden lg:block">
          <Header />
        </div>
        <div className="block lg:hidden">
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
        <div className="flex flex-1 flex-col items-start justify-between gap-8 p-6 text-left text-white lg:p-[64px]">
          <div className="flex items-start justify-between self-stretch">
            <h1 className="font-(family-name:--font-heading-light) text-2xl leading-[110%] font-[300] tracking-[-1.44px] lg:text-[48px]">
              a toronto based <br /> hackathon
            </h1>
            <img
              src="whitesmall.png"
              alt=""
              className="h-[50px] w-auto flex-shrink-0 lg:h-[80px]"
            />
          </div>
          <img
            src="whitetext.png"
            alt="hack404 big label"
            className="h-auto w-full"
          />
        </div>

        {/* Horizontal border */}
        <HBorder />

        {/* Gradient border */}
        <GradientBorder reverse={true} />

        {/* Submission Area */}
        <footer className="m-6 flex flex-col items-center gap-6 lg:m-0 lg:h-[218px] lg:flex-row lg:items-center lg:px-[64px] lg:py-[70px]">
          {/* Coming soon text - different layout for desktop vs mobile/tablet */}
          <div
            className="hidden lg:block"
            style={{ width: `calc(${colWidth}px - 1.5rem)` }}
          >
            <h1 className="pr-4 font-(family-name:--font-heading) text-2xl text-white">
              Coming soon <br />
              Summer 2025
            </h1>
          </div>
          <div className="flex w-full justify-between text-white lg:hidden">
            <h1>Summer 2025</h1>
            <h1>Coming soon</h1>
          </div>

          {/* Waitlist input and submit button */}
          <div className="relative flex w-full flex-1">
            <WaitlistBox
              email={email}
              setEmail={setEmail}
              submitted={submitted}
            />

            {/* Clickable button overlay */}
            <button
              className="flex flex-shrink-0 flex-row items-center justify-start"
              onClick={handleSubmit}
              disabled={isSubmitting || submitted}
            >
              {/* Submit button - show text for tablet and desktop only */}
              <p className="hidden h-full w-24 max-w-[204px] items-center justify-start bg-white pl-6 text-black sm:flex lg:w-44 lg:text-2xl">
                {submitText}
              </p>
              <img
                className="h-full"
                src="button.svg"
                alt="submit button arrow"
              />
            </button>
          </div>
        </footer>
      </div>

      {/* ========================= SECOND HALF OF PAGE ========================= */}
      {/* About page and contact page (second screen) */}
      <div
        id="about-us"
        className="relative flex min-h-screen flex-col justify-between lg:max-w-[calc(100vh*(7/3))]"
      >
        <div className="flex flex-col items-start justify-between text-left text-white">
          {/* about us */}
          <div className="bg-background absolute inset-0 -z-30" />
          <div className="flex shrink-0 flex-col items-start gap-12 px-[24px] py-[30px] sm:flex-row sm:gap-6 sm:px-[24px] sm:py-[64px] lg:px-[64px] lg:py-[70px]">
            <h1
              className="shrink-0 font-(family-name:--font-heading) text-4xl leading-[110%] lg:text-5xl"
              style={{ width: `calc(${colWidth}px - 1.5rem)` }}
            >
              About us
            </h1>
            {/* there is DEFINITELY a better way to do this but im too tired */}
            <p className="gradient-text font-(family-name:--font-heading-light) text-[28px] leading-[110%] tracking-[-0.84px] sm:text-[32px] sm:tracking-[-0.96px] lg:text-[48px] lg:tracking-[-1.44px]">
              Hack404{" "}
              <span className="solid-white">
                is coming soon! We're a hackathon based in
              </span>{" "}
              Toronto{" "}
              <span className="solid-white">
                for secondary and post-secondary students, open to anyone
                from{" "}
              </span>{" "}
              beginners <span className="solid-white">to</span> experienced{" "}
              <span className="solid-white"> hackers. </span>Sign up
              <span className="solid-white">
                {" "}
                today and experience the tech of the future.
              </span>
            </p>
          </div>
          <HBorder />
          {/* contact */}
          <div className="flex items-start justify-between self-stretch px-[24px] py-[30px] sm:px-[24px] sm:py-[64px] lg:px-[64px] lg:py-[70px]">
            <div className="flex-col items-start gap-6">
              <h1 className="shrink-0 font-(family-name:--font-heading) text-4xl lg:text-5xl">
                Contact
              </h1>
              {/* Messy text formatting, fix later */}
              <p className="gradient-text font-(family-name:--font-heading-light) text-base [line-height:110%] [letter-spacing:-0.84px] sm:text-[28px] lg:text-[28px]">
                emma.xing@power-unit.org <br />
                support@hack404.dev
              </p>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-right font-(family-name:--font-heading-light) text-[40px] [line-height:110%] [letter-spacing:-1.44px] lg:text-[48px]">
                a toronto based <br /> hackathon
              </h1>
            </div>
          </div>
          <HBorder />
        </div>
        <div className="flex h-full grow flex-col items-end justify-between gap-16 p-6 sm:px-6 sm:py-[38px] lg:p-16">
          <div className="block sm:hidden">
            <h1 className="text-right font-(family-name:--font-heading-light) text-[38px] [line-height:110%] [letter-spacing:-1.44px]">
              a toronto based <br /> hackathon
            </h1>
          </div>
          <div className="flex items-end justify-between self-stretch">
            <img
              src="whitefull.png"
              alt=""
              className="w-[135px] sm:w-[130px]"
            />
            <img src="PUYOlogo.png" alt="" className="w-[135px] sm:w-[130px]" />
          </div>
        </div>
      </div>
    </>
  );
}
