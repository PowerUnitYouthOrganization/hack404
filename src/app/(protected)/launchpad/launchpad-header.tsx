"use client";

import { Button } from "@/components/ui/button";
import RoundedButton from "@/components/ui/roundedbutton";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface LaunchpadHeaderProps {
  activeTab: string;
  tabChangeAction: (tab: string) => void;
}

export default function LaunchpadHeader({
  activeTab,
  tabChangeAction,
}: LaunchpadHeaderProps) {
  const { data: session } = useSession();
  const avatarUrl = session?.user?.image || null;
  const [showProfileCard, setShowProfileCard] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Get user's name parts
  const fullName = session?.user?.name || "";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileCard(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { label: "Home", value: "home" },
    // { label: "Agenda", value: "agenda" },
    // { label: "Mentor", value: "mentor" },
    // { label: "Resources", value: "resources" },
    // { label: "Map", value: "map" }
  ];

  return (
    <header className="flex flex-col gap-3 w-full">
      <div className="grid h-24 p-6 gap-x-2.5 gap-y-2.5 flex-shrink-0 self-stretch grid-rows-1 grid-cols-[minmax(0,1fr)_700px_minmax(0,1fr)]">
        <div className="flex px-3 items-center gap-5 flex-1 self-stretch row-[1/2] col-[1/2]">
          <Link href="/">
            <Image
              src="/clearlogo.png"
              alt="Hack404 Logo"
              width={26}
              height={19}
              className="cursor-pointer hover:opacity-80"
            />
          </Link>
          <Link href="/launchpad">
            <h1 className="text-white text-2xl font-(family-name:--font-heading) tracking-[-0.72px] cursor-pointer hover:opacity-80">
              launchpad
            </h1>
          </Link>
        </div>
        {/* navbar */}
        <div className="flex px-[22px] flex-col justify-center items-center gap-[10px] flex-1 self-stretch col-[2/3] row-[1/2]">
          <nav className="flex p-1 items-center gap-[4px] rounded-[8px] bg-[rgba(48,242,242,0.20)] backdrop-blur-[25px] ">
            {/* the buttons
					TODO: Add checker for active button and change the variant accordingly
					*/}
            {navItems.map((item) => (
              <Button
                key={item.value}
                variant={
                  activeTab === item.value
                    ? "launchpad-active"
                    : "launchpad-inactive"
                }
                onClick={() => tabChangeAction(item.value)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
        {/* profile and qr code buttons */}
        <div className="flex justify-end items-center gap-1 flex-1 self-stretch row-[1/2] col-[3/4] relative">
          <div ref={profileRef} className="relative">
            <RoundedButton
              color="rgba(48,242,242,0.20)"
              className="flex self-stretch text-wcyan gap-4 pl-4 pr-2"
              onClick={() => setShowProfileCard(!showProfileCard)}
            >
              Profile
              <Avatar className="w-6 h-6 rounded-md">
                <AvatarImage src={avatarUrl || undefined} />
                <AvatarFallback className="bg-wblack/20 text-white text-sm">
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </RoundedButton>

            {/* Profile dropdown card */}
            {showProfileCard && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 backdrop-blur-[25px] rounded-lg p-4 z-50">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 rounded-md">
                    <AvatarImage src={avatarUrl || undefined} />
                    <AvatarFallback className="bg-wblack/20 text-white">
                      {firstName.charAt(0)}
                      {lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">
                      {firstName} {lastName}
                    </span>
                    <span className="text-white/60 text-xs">
                      {session?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* <RoundedButton
						color="#C3F73A"
						className="text-black"
					>
						QR Code
						<QrCodeIcon className="text-black" />
					</RoundedButton> */}
        </div>
      </div>
    </header>
  );
}
