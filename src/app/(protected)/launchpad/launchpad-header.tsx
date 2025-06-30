"use client";

import { Button } from "@/components/ui/button";
import RoundedButton from "@/components/ui/roundedbutton";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { QrCode } from "lucide-react";
import QRCode from "react-qr-code";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ProfileDropdown from "@/components/profile-dropdown";

interface LaunchpadHeaderProps {
  activeTab: string;
  tabChangeAction: (tab: string) => void;
}

export default function LaunchpadHeader({
  activeTab,
  tabChangeAction,
}: LaunchpadHeaderProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const avatarUrl = session?.user?.image || null;
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoadingUserId, setIsLoadingUserId] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  // Get user's name parts
  const fullName = session?.user?.name || "";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  // Fetch user ID when component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      if (!session?.user?.email) return;

      setIsLoadingUserId(true);
      try {
        const response = await fetch("/api/get-user-id");
        if (response.ok) {
          const data = await response.json();
          console.log(data.userId);
          setUserId(data.userId);
        } else {
          console.error("Failed to fetch user ID");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      } finally {
        setIsLoadingUserId(false);
      }
    };

    fetchUserId();
  }, [session?.user?.email]);

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
    { label: "Agenda", value: "agenda" },
    // { label: "Mentor", value: "mentor" },
    // { label: "Resources", value: "resources" },
    // { label: "Map", value: "map" }
  ];

  return (
    <header className="flex flex-col gap-3 w-full">
      {/* Desktop Layout */}
      <div className="hidden tablet:grid h-24 p-6 gap-x-2.5 gap-y-2.5 flex-shrink-0 self-stretch grid-rows-1 grid-cols-[minmax(0,1fr)_700px_minmax(0,1fr)]">
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
            {" "}
            <RoundedButton
              color="rgba(48,242,242,0.20)"
              className="flex self-stretch text-wcyan gap-4 pl-4 pr-2"
              onClick={() => {
                setShowProfileCard(!showProfileCard);
              }}
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
            <ProfileDropdown
              isVisible={showProfileCard}
              onClose={() => setShowProfileCard(false)}
            />
          </div>

          <div className="relative" ref={qrRef}>
            <RoundedButton
              color="#C3F73A"
              className="text-black"
              onClick={() => setShowQRModal(!showQRModal)}
            >
              QR Code
              <QrCode className="text-black" />
            </RoundedButton>

            {showQRModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setShowQRModal(false)}
                />

                <div className="relative w-80 bg-[#C3F73A]/20 border border-[#C3F73A]/30 backdrop-blur-[25px] rounded-lg p-6 shadow-xl z-50">
                  <button
                    onClick={() => setShowQRModal(false)}
                    className="absolute top-2 right-3 text-white text-xl hover:text-red-300"
                  >
                    ×
                  </button>
                  <div className="flex flex-col items-center justify-center h-60 gap-4">
                    {isLoadingUserId ? (
                      <div className="text-white">Loading...</div>
                    ) : userId ? (
                      <>
                        <QRCode
                          value={userId}
                          size={200}
                          bgColor="transparent"
                          fgColor="white"
                          level="H"
                        />
                        <p className="text-white text-center">
                          {session?.user?.name ||
                            "wtf why dont you have a name"}
                        </p>
                      </>
                    ) : (
                      <div className="text-white text-sm">
                        Unable to load user data
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="tablet:hidden flex justify-between items-center p-6">
        <div className="flex items-center gap-5">
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
            <h1 className="text-white text-xl font-(family-name:--font-heading) tracking-[-0.72px] cursor-pointer hover:opacity-80">
              launchpad
            </h1>
          </Link>
        </div>

        <div ref={profileRef} className="relative">
          {" "}
          <RoundedButton
            color="rgba(48,242,242,0.20)"
            className="flex self-stretch text-wcyan gap-3 pl-3 pr-2 text-sm"
            onClick={() => {
              console.log(
                "Mobile Profile button clicked, current showProfileCard:",
                showProfileCard,
              );
              setShowProfileCard(!showProfileCard);
              console.log(
                "Mobile Setting showProfileCard to:",
                !showProfileCard,
              );
            }}
          >
            Profile
            <Avatar className="w-5 h-5 rounded-md">
              <AvatarImage src={avatarUrl || undefined} />
              <AvatarFallback className="bg-wblack/20 text-white text-xs">
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </AvatarFallback>{" "}
            </Avatar>
          </RoundedButton>
          {/* Profile dropdown card */}
          <ProfileDropdown
            isVisible={showProfileCard}
            onClose={() => setShowProfileCard(false)}
          />
        </div>
      </div>
    </header>
  );
}
