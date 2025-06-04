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
  const { hasApplication, applicationSubmitted, loading } = useApplicationStatus();

  useEffect(() => {
    if (!loading && hasApplication && applicationSubmitted) {
      router.push("/application/thankyou");
    }
  }, [loading, hasApplication, applicationSubmitted, router]);

  if (loading) {
    return (
      <div className="flex flex-col h-dvh gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
        <GradientBackgroundStatic />
        <LaunchpadHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex flex-col w-full flex-1 justify-center items-center">
          <div className="text-white text-xl">Checking application status...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-dvh gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
      <GradientBackgroundStatic />
      <LaunchpadHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex flex-col w-full flex-1">
        <div className="flex justify-center w-full flex-1">
          <div className="w-full max-w-7xl h-full grid grid-rows-[auto_1fr] grid-cols-2 min-h-[60vh]" style={{height: 'calc(100dvh - 120px)'}}>
            {/* Pick your stream section (spans both columns) */}
            <div className="row-start-1 row-end-2 col-span-2 flex flex-col justify-center items-start px-8 py-12 max-h-60 border border-cyan-400/20">
              <h1 className="text-[40px] leading-normal font-(family-name:--font-heading)">
                Pick your stream
              </h1>
              <sub className="text-wcyan font-light text-sm">
                Choose the best fit for your experience
              </sub>
            </div>
            {/* Beginner Cell */}
            <StreamCell
              name="Beginner"
              brief="Designed for beginners with no more than
one past hackathon experience"
              description="Difference between beginner and advanced hacker stream. Wow I have no idea what that is but it sure sounds interesting yippee kai-yay!"
              buttonText="Apply for Beginner"
              onClick={() => router.push("/application/beginner")}
            />
            {/* Normal Cell */}
            <StreamCell
              name="Normal"
              brief="Open for anyone"
              description="Difference between beginner and advanced hacker stream. Wow I have no idea what that is but it sure sounds interesting yippee kai-yay!"
              buttonText="Apply for Normal"
              onClick={() => router.push("/application/normal")}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
