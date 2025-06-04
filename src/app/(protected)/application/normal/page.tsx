"use client";

import GradientBackgroundStatic from "@/components/gradient-background-static";
import LaunchpadHeader from "@/app/(protected)/launchpad/launchpad-header";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApplicationForm from "@/components/application/ApplicationForm";
import { useApplicationStatus } from "@/hooks/use-application-status";

export default function NormalApplicationPage() {
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
      <div className="flex flex-col min-h-screen h-dvh w-full gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
        <GradientBackgroundStatic />
        <LaunchpadHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="w-full flex-1 flex justify-center items-center">
          <div className="text-white text-xl">Checking application status...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen h-dvh w-full gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
      <GradientBackgroundStatic />
      <LaunchpadHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_2fr] gap-4 p-2 md:p-12">
        {/* Left Panel */}
        <div className="flex flex-col justify-start border border-cyan-400/20 bg-[rgba(14,17,22,0.25)] backdrop-blur-[25px] p-10 min-h-[500px] h-full">
          <h1 className="text-white text-5xl font-(family-name:--font-heading) mb-4">Apply</h1>
          <h2 className="text-white text-3xl font-(family-name:--font-heading) font-light mb-8">Attend Hack404!</h2>
          <p className="text-white/60 text-base font-light max-w-md">
            For experienced hackers with more than one past hackathon experience. Show us your technical prowess and innovative thinking!
          </p>
        </div>
        {/* Right Panel (Form) */}
        <div className="flex flex-col gap-8 border border-cyan-400/20 bg-gradient-to-br from-[rgba(48,242,242,0.10)] to-[rgba(48,242,242,0.05)] backdrop-blur-[25px] p-8">
          <ApplicationForm 
            stream="normal"
            shortAnswer1={{
              label: "You wake up one morning and everything you know how to do has been '404'd' from your memory. What's the first thing you teach yourself again?",
              maxLength: 750
            }}
            shortAnswer2={{
              label: "What's a technical project that you've built that you're most proud of?",
              maxLength: 750
            }}
            streamDescription="For experienced hackers with more than one past hackathon experience"
          />
        </div>
      </div>
    </div>
  );
}