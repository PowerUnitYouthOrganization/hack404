"use client";

import Link from "next/link";
import GradientBackgroundStatic from "@/components/gradient-background-static";
import RoundedButton from "@/components/ui/roundedbutton";
import LaunchpadHeader from "@/app/(protected)/launchpad/launchpad-header";
import { useState } from "react";

export default function ThankYouPage() {
  const [activeTab, setActiveTab] = useState("home");
  return (
    <div className="flex flex-col min-h-screen h-dvh w-full gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116] relative">
      <GradientBackgroundStatic />
      <LaunchpadHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full flex justify-center items-center p-2 md:p-12">
        <div className="flex flex-col gap-8 border border-cyan-400/20 bg-gradient-to-br from-[rgba(48,242,242,0.10)] to-[rgba(48,242,242,0.05)] backdrop-blur-[25px] p-8 items-start justify-center min-h-[500px] w-full max-w-4xl mx-auto">
          <h1 className="text-white text-[40px] leading-normal font-(family-name:--font-heading) font-normal mb-4 text-left w-full">Thanks for applying!</h1>
          <h2 className="text-white text-[40px] leading-normal font-(family-name:--font-heading) font-light mb-8 text-left w-full">We'll decide if ur coming or not shortly…</h2>
          <p className="text-white/60 text-base font-light mb-8 text-left max-w-lg w-full">
            Keep an eye out for an email from Hack404! Remember to also check your spam folders.
          </p>
          <Link href="/launchpad" className="inline-block">
            <RoundedButton
              color="#30F2F2"
              type="submit"
              className="text-black px-8 py-3 rounded-[100px] font-medium text-lg transition-all duration-200 flex items-center gap-2"
            >
              Continue
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </RoundedButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
