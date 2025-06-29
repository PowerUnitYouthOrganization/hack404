"use client";

import LaunchpadHeader from "@/app/(protected)/launchpad/launchpad-header";
import MobileFooter from "@/app/(protected)/launchpad/mobile-footer";
import { useState, useEffect } from "react";
import Prehome from "./prehome";
import { SessionProvider } from "next-auth/react";
import GradientBackgroundStatic from "@/components/gradient-background-static";
import Home from "./pages/home";
import Agenda from "./pages/agenda";
import Rejected from "./pages/rejected";

/**
 * This component serves as the main layout for the hacker dashboard page.
 * @returns Launchpad component
 */
export default function Launchpad() {
  const [activeTab, setActiveTab] = useState("home");

  // Fetch user ID when component mounts
  useEffect(() => {
    const checkAcceptance = async () => {
      try {
        const response = await fetch("/api/check-acceptance");
        if (response.ok) {
          const data = await response.json();
          if (data.accepted) {
            setActiveTab("home");
          } else {
            setActiveTab("rejected");
          }
        } else {
          console.error("Failed to fetch acceptance status");
        }
      } catch (error) {
        console.error("Error fetching acceptance status:", error);
      }
    };

    checkAcceptance();
  }, []);

  return (
    <SessionProvider>
      <div className="h-screen tablet:h-dvh bg-gradient-to-b from-[rgba(14,17,22,0.25)] to-[#0E1116]">
        <GradientBackgroundStatic />

        {/* Master container that stretches to 24px from bottom */}
        <div className="flex flex-col h-[calc(100vh-24px)] tablet:h-[calc(100dvh-24px)] gap-3">
          <div className="flex-shrink-0">
            {activeTab !== "rejected" && (
              <LaunchpadHeader
                activeTab={activeTab}
                tabChangeAction={setActiveTab}
              />
            )}
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === "home" && <Home />}
            {activeTab === "agenda" && <Agenda />}
            {activeTab === "rejected" && <Rejected />}
          </div>

          <div className="flex-shrink-0">
            <MobileFooter
              activeTab={activeTab}
              tabChangeAction={setActiveTab}
            />
          </div>
        </div>
      </div>
    </SessionProvider>
  );
}
