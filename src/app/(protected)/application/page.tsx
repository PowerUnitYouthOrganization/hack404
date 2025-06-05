"use client";

import GradientBackgroundStatic from "@/components/gradient-background-static";
import { useState, useEffect } from "react";
import LaunchpadHeader from "../launchpad/launchpad-header";
import { useRouter } from "next/navigation";
import StreamCell from "@/components/application/StreamCell";
import { useApplicationStatus } from "@/hooks/use-application-status";

export default function ApplicationPage() {
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();
  const { hasApplication, applicationSubmitted, loading } =
    useApplicationStatus();

  useEffect(() => {
    if (!loading && hasApplication && applicationSubmitted) {
      router.push("/application/thankyou");
    }
  }, [loading, hasApplication, applicationSubmitted, router]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
        <GradientBackgroundStatic />
        <div className="hidden md:block w-full">
          <LaunchpadHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <main className="flex flex-col w-full flex-1 justify-center items-center">
          <div className="text-white text-xl">
            Checking application status...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
      <GradientBackgroundStatic />
      <div className="hidden md:block w-full">
        <LaunchpadHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <main className="flex flex-col w-full flex-1">
        <div className="flex justify-center w-full flex-1 min-h-screen">
          <div
            className="w-full max-w-7xl h-full grid grid-rows-[auto_1fr] grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Pick your stream section (spans both columns) */}
            <div className="hidden md:flex row-start-1 row-end-2 col-span-1 md:col-span-2 flex-col justify-center items-start px-4 md:px-8 py-6 md:py-12 max-h-60 border border-cyan-400/20">
              <h1 className="text-[28px] md:text-[40px] leading-normal font-(family-name:--font-heading)">
                Pick your stream
              </h1>
              <sub className="text-wcyan font-light text-xs md:text-sm">
                Choose the best fit for your experience
              </sub>
            </div>
            {/* Beginner Cell */}
            <StreamCell
              name="Beginner"
              brief="Designed for beginners with no more than one past hackathon experience"
              description="Beginner Stream is designed for teams with at least 3 new hackers and focuses on learning and growth, not just the final product. These teams will submit a simple portfolio that outlines what they set out to build, what they learned, and how they tackled challenges.

We'll provide templates, milestone prompts, and mentorship to make the portfolio easy and helpful — not a chore."
              buttonText="Apply for Beginner"
              onClick={() => router.push("/application/beginner")}
            />
            {/* Normal Cell */}
            <StreamCell
              name="Normal"
              brief="Open for anyone"
              description="The Normal Stream will follow more traditional hackathon judging — focused on the final project's creativity, technical complexity, usability, and polish."
              buttonText="Apply for Normal"
              onClick={() => router.push("/application/normal")}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
