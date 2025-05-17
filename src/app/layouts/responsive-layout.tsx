import Header from "@/app/components/header";
import SmallHeader from "@/app/components/small-header";
import GradientBorder from "@/app/components/gradient-border";
import Grid from "@/app/components/grid";
import HBorder from "@/app/components/h-border";
import GradientBackground from "@/app/components/gradient-background";
import WaitlistBox from "../components/waitlist-box";

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
  deviceType: "mobile" | "tablet" | "desktop";
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
  deviceType,
}: LayoutProps) {
  // Determine dynamic values based on device type
  const isDesktop = deviceType === "desktop";
  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";

  console.log(`${deviceType} layout rendered`);

  // Container styles
  const containerStyle = {
    maxWidth: isDesktop ? `calc(100vh * (7 / 3))` : undefined,
  };

  /* ========================= FIRST HALF OF PAGE =========================  */

  // Content padding
  const contentPadding = isDesktop ? "p-[64px]" : "p-6";

  // Logo size
  const logoSize = isDesktop ? "h-[80px]" : "h-[50px]";

  // Title text size
  const titleSize = isDesktop ? "text-[48px]" : "text-2xl";

  // Footer layout
  const submissionArea = isDesktop
    ? "flex items-center h-[218px] px-[64px] py-[70px]"
    : "flex flex-col items-center m-6 gap-6";

  // Submit button width
  const submitButtonWidth = isMobile ? "w-[78px]" : isTablet ? "w-[158px]" : "";

  // Submit text
  const submitText = isDesktop
    ? isSubmitting
      ? "Submitting..."
      : "Submit"
    : submitted
      ? "Submitted"
      : "Submit";

  // Submit button class
  const submitButtonClass = isDesktop
    ? "flex items-center justify-start text-2xl text-black bg-white pl-6 max-w-[204px]"
    : "flex items-center justify-start text-black bg-white pl-6 max-w-[204px]";

  /* ========================= SECOND HALF OF PAGE ========================= */
  // body text size
  const aboutTextStyle = isDesktop
    ? "text-[48px] tracking-[-1.44px]"
    : isTablet
      ? "text-[32px] tracking-[-0.96px]"
      : "text-[28px] tracking-[-0.84px]";

  const aboutPadding = isDesktop
    ? "px-[64px] py-[70px]"
    : isTablet
      ? "px-[24px] py-[64px]"
      : "py-[30px] px-[24px]";

  const aboutLayout = isMobile ? "flex flex-col gap-12" : "flex gap-6";

  const contactTextSize = isDesktop
    ? "text-[28px]"
    : isTablet
      ? "text-[28px]"
      : "text-base";

  const contactLayout = isMobile ? "" : "";

  const taglineSize = isDesktop
    ? "text-[48px]"
    : isTablet
      ? "text-[40px]"
      : "text-[38px]";

  const footerPadding = isDesktop
    ? "p-16"
    : isTablet
      ? "px-6 py-[38px]"
      : "p-6";

  return (
    <>
      <div className="relative flex min-h-dvh flex-col" style={containerStyle}>
        {/* Header: different components for desktop vs mobile/tablet */}
        {isDesktop ? <Header /> : <SmallHeader />}

        {/* Grid and background */}
        <div className="-z-20">
          <Grid type={deviceType} onLinkWidth={setHeaderBinWidth} />
        </div>
        <div className="black-screen" />
        <GradientBackground />

        <HBorder />

        {/* Main content section */}
        <div
          className={`flex flex-1 flex-col items-start gap-8 text-left ${contentPadding} justify-between text-white`}
        >
          <div className="flex items-start justify-between self-stretch">
            <h1
              className={`font-[300] ${titleSize} font-(family-name:--font-heading-light) leading-[110%] tracking-[-1.44px]`}
            >
              a toronto based <br /> hackathon
            </h1>
            <img
              src="whitesmall.png"
              alt=""
              className={`${logoSize} w-auto flex-shrink-0`}
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
        <div className={submissionArea}>
          {/* Coming soon text - different layout for desktop vs mobile/tablet */}
          {isDesktop ? (
            <h1
              className="flex-shrink-0 pr-4 font-(family-name:--font-heading) text-2xl text-white"
              style={headerBinWidth ? { width: headerBinWidth } : undefined}
            >
              Coming soon <br /> Summer 2025
            </h1>
          ) : (
            <div className="flex w-full justify-between text-white">
              <h1>Summer 2025</h1>
              <h1>Coming soon</h1>
            </div>
          )}

          {/* Waitlist input and submit button - common for all layouts */}
          <div className="relative flex w-full">
            <WaitlistBox
              email={email}
              setEmail={setEmail}
              submitted={submitted}
            />

            {/* Submit button - show text for desktop and tablet only */}
            {!isMobile && (
              <div
                className={submitButtonClass}
                style={
                  headerBinWidth
                    ? {
                        width: isDesktop ? headerBinWidth + 48 : headerBinWidth,
                      }
                    : undefined
                }
              >
                <p>{submitText}</p>
              </div>
            )}

            {/* Clickable button overlay */}
            <button
              className={`absolute top-0 right-0 h-full ${isMobile ? submitButtonWidth : "w-full"} z-100 max-w-[282px] cursor-pointer opacity-50`}
              onClick={handleSubmit}
              disabled={isSubmitting || submitted}
            ></button>
            <img src="button.svg" alt="submit button arrow" />
          </div>
        </div>
      </div>

      {/* ========================= SECOND HALF OF PAGE ========================= */}
      {/* About page and contact page (second screen) */}
      <div
        id="about-us"
        className="relative flex min-h-dvh flex-col justify-between"
        style={containerStyle}
      >
        <div
          className={`flex flex-col items-start justify-between text-left text-white`}
        >
          {/* about us */}
          <div className="bg-background absolute inset-0 -z-30" />
          <div
            className={`${aboutLayout} shrink-0 items-start ${aboutPadding} `}
          >
            <h1
              className={`${titleSize} shrink-0 font-(family-name:--font-heading) leading-[110%]`}
              style={
                !isMobile && headerBinWidth
                  ? { width: headerBinWidth }
                  : undefined
              }
            >
              About us
            </h1>
            {/* there is DEFINITELY a better way to do this but im too tired */}
            <p
              className={`${aboutTextStyle} gradient-text font-(family-name:--font-heading-light) leading-[110%]`}
            >
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
          <div
            className={`flex ${aboutPadding} items-start justify-between self-stretch`}
          >
            <div className="flex-col items-start gap-6">
              <h1
                className={`${titleSize} shrink-0 font-(family-name:--font-heading)`}
              >
                Contact
              </h1>
              {/* Messy text formatting, fix later */}
              <p
                className={`gradient-text ${contactTextSize} [style="line-height:110%;letter-spacing:-0.84px"] font-(family-name:--font-heading-light)`}
              >
                support@hack404.dev
              </p>
            </div>
            {!isMobile && (
              <h1
                className={`text-right [line-height:110%] [letter-spacing:-1.44px] ${taglineSize} font-(family-name:--font-heading-light)`}
              >
                a toronto based <br /> hackathon
              </h1>
            )}
          </div>
          <HBorder />
        </div>
        <div
          className={`flex h-full grow flex-col items-end justify-between gap-16 ${footerPadding}`}
        >
          {isMobile && (
            <h1
              className={`text-right [line-height:110%] [letter-spacing:-1.44px] ${taglineSize} font-(family-name:--font-heading-light)`}
            >
              a toronto based <br /> hackathon
            </h1>
          )}
          <div className="flex items-end justify-between self-stretch">
            <img
              src="whitefull.png"
              alt=""
              style={
                isMobile
                  ? { width: "135px" }
                  : headerBinWidth
                    ? { width: headerBinWidth }
                    : undefined
              }
            />
            <img
              src="PUYOlogo.png"
              alt=""
              className=""
              style={
                isMobile
                  ? { width: "135px" }
                  : headerBinWidth
                    ? { width: headerBinWidth }
                    : undefined
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
