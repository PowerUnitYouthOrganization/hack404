"use client";

import LaunchpadHeader from "@/app/(protected)/launchpad/launchpad-header";
import { useState } from "react";
import Prehome from "./prehome";
import { SessionProvider } from "next-auth/react";
import GradientBackgroundStatic from "@/components/gradient-background-static";

// could probably be moved to json or something
interface AgendaEvent {
  name: string;
  startTime: Date;
  endTime: Date;
  roomNumber: string;
}

interface Announcement {
  title: string;
  content: string;
  announcer: string;
  avatarLink: string;
}

/**
 * This component serves as the main layout for the hacker dashboard page.
 * @returns Launchpad component
 */
export default function Launchpad() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <SessionProvider>
      <div className="flex flex-col h-dvh gap-3 items-start bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
        <GradientBackgroundStatic />
        <LaunchpadHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <Prehome />
      </div>
    </SessionProvider>
  );
}
