"use client";

import LaunchpadHeader from "@/app/(protected)/launchpad/launchpad-header";
import { useState } from "react";
import Prehome from "./prehome";
import { SessionProvider } from "next-auth/react";
import GradientBackgroundStatic from "@/components/gradient-background-static";

/**
 * This component serves as the main layout for the hacker dashboard page.
 * @returns Launchpad component
 */
export default function Launchpad() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <SessionProvider>
      <div className="flex flex-col h-screen tablet:h-dvh gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
        <GradientBackgroundStatic />
        <div className="hidden tablet:block w-full">
          <LaunchpadHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <Prehome />
      </div>
    </SessionProvider>
  );
}
