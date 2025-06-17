"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Home, Calendar, Users, BookOpen, Map, QrCode } from "lucide-react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";

interface MobileFooterProps {
  activeTab: string;
  tabChangeAction: (tab: string) => void;
}

export default function MobileFooter({
  activeTab,
  tabChangeAction,
}: MobileFooterProps) {
  const { data: session } = useSession();
  const [showQRModal, setShowQRModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoadingUserId, setIsLoadingUserId] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  // Fetch user ID when component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      if (!session?.user?.email) return;

      setIsLoadingUserId(true);
      try {
        const response = await fetch("/api/get-user-id");
        if (response.ok) {
          const data = await response.json();
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

  const navItems = [
    { label: "Home", value: "home", icon: Home },
    { label: "Agenda", value: "agenda", icon: Calendar },
    { label: "Mentor", value: "mentor", icon: Users },
    { label: "Resources", value: "resources", icon: BookOpen },
    { label: "Map", value: "map", icon: Map },
  ];

  return (
    <>
      {/* Mobile Footer - Only visible on mobile */}
      <div className="md:hidden fixed left-0 bottom-0 right-0 z-40">
        <div className="bg-gradient-to-t from-black to-transparent h-32 flex items-end">
          <div className="flex justify-between items-center w-full px-9 pb-9 gap-3">
            {/* Navigation Icons */}
            <nav className="flex p-1 items-center gap-[4px] rounded-[8px] bg-[rgba(48,242,242,0.20)] backdrop-blur-[25px]">
              {navItems.map((item) => {
                const IconComponent = item.icon;

                return (
                  <Button
                    key={item.value}
                    variant={
                      activeTab === item.value
                        ? "launchpad-active"
                        : "launchpad-inactive"
                    }
                    onClick={() => tabChangeAction(item.value)}
                    className="w-12 h-12 p-0"
                  >
                    <IconComponent className="w-5 h-5" />
                  </Button>
                );
              })}
            </nav>

            {/* QR Code Button */}
            <div className="relative" ref={qrRef}>
              <button
                onClick={() => setShowQRModal(!showQRModal)}
                className="w-12 h-12 rounded-full bg-[#C3F73A] flex items-center justify-center text-black hover:bg-[#B8E834] transition-all duration-200 shadow-lg shadow-[#C3F73A]/20"
              >
                <QrCode className="w-5 h-5" />
              </button>

              {/* QR Modal */}
              {showQRModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    onClick={() => setShowQRModal(false)}
                  />

                  <div className="relative w-full max-w-sm bg-wblack/20 border border-[#C3F73A]/30 backdrop-blur-[25px] rounded-lg p-6 shadow-xl z-50">
                    <button
                      onClick={() => setShowQRModal(false)}
                      className="absolute top-2 right-3 text-white text-xl hover:text-red-300"
                    >
                      ×
                    </button>
                    <div className="flex flex-col items-center justify-center gap-4 pt-4">
                      {isLoadingUserId ? (
                        <div className="text-white">Loading...</div>
                      ) : userId ? (
                        <>
                          <QRCode
                            value={userId}
                            size={256}
                            bgColor="transparent"
                            fgColor="white"
                            level="H"
                          />
                          <p className="text-white text-center text-sm">
                            {session?.user?.name || "User"}
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
      </div>
    </>
  );
}
