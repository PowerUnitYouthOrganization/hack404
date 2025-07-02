"use client";

import dynamic from "next/dynamic";

const Scanner = dynamic(
  () =>
    import("@yudiel/react-qr-scanner").then((mod) => ({
      default: mod.Scanner,
    })),
  { ssr: false },
);

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useHackerScanner } from "./hackerScannerCtx";
import { InferSelectModel } from "drizzle-orm"; // `is` was removed from drizzle-orm, so I'm removing it from here
import { users } from "@/db/schema";

type UserAction =
  | "checkin"
  | "checkout"
  | "meal"
  | "microhack"
  | "makeAdmin"
  | "removeAdmin";

export default function qrScanner() {
  const { isScanning, setIsScanning, lastUser, setLastUser } =
    useHackerScanner();
  const [canStartNewScan, setCanStartNewScan] = useState(true);
  const [selectedAction, setSelectedAction] = useState<UserAction | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [userBeforeAction, setUserBeforeAction] = useState<InferSelectModel<
    typeof users
  > | null>(null);

  const handleStartNewScan = () => {
    setScanError(null);
    setIsScanning(true);
    setCanStartNewScan(false);
  };

  const handleActionSelect = (action: string) => {
    if (action === "none") {
      setSelectedAction(null);
    } else {
      setSelectedAction(action as UserAction);
    }
  };

  const performScanAction = async (
    userId: string,
    action: UserAction | null,
  ) => {
    // First, get the user data before any action
    const getUserResponse = await fetch(`/admin/api/users/${userId}`, {
      method: "GET",
    });
    if (!getUserResponse.ok) {
      const errorData = await getUserResponse.json();
      throw new Error(
        errorData.error ||
          `Request failed with status ${getUserResponse.status}`,
      );
    }
    const userBeforeAction = await getUserResponse.json();

    // If there's an action to perform, do it now
    if (action) {
      const actionResponse = await fetch(`/admin/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!actionResponse.ok) {
        const errorData = await actionResponse.json();
        throw new Error(
          errorData.error ||
            `Request failed with status ${actionResponse.status}`,
        );
      }
    }

    return userBeforeAction;
  };

  useEffect(() => {
    const handleKeyDown = () => {
      if (canStartNewScan) {
        handleStartNewScan();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canStartNewScan]);
  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-4 sm:py-8 max-w-none">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal font-['FH_Lecturis_Rounded'] text-white mb-2">
          Hacker Scanner
        </h1>
        <p className="text-white/60 text-sm sm:text-base md:text-lg font-light">
          Scan QR codes and manage user actions efficiently
        </p>
      </div>

      {/* Scanner Card */}
      <div className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px] p-3 sm:p-6">
        <div className="mb-4 w-full">
          <Select onValueChange={handleActionSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select action type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="checkin">Check In</SelectItem>
              <SelectItem value="checkout">Check Out</SelectItem>
              <SelectItem value="microhack">Microhack</SelectItem>{" "}
              {/* Renamed here */}
              <SelectItem value="meal">Meals</SelectItem>
              <SelectItem value="makeAdmin">Make Admin</SelectItem>
              <SelectItem value="removeAdmin">Remove Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {canStartNewScan ? (
          <div className="flex flex-col items-center justify-center min-h-64 gap-4 text-center">
            <div className="bg-[rgba(48,242,242,0.05)] border border-cyan-400/10 rounded-lg p-4 w-full max-w-md">
              <h3 className="text-lg font-medium text-white mb-3">
                Last Scan Result
              </h3>
              <div className="space-y-2 text-sm md:text-base text-white">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Name:</span>
                  <span className="font-medium text-right break-words">
                    {userBeforeAction
                      ? userBeforeAction.firstName?.trim() +
                        " " +
                        userBeforeAction.lastName?.trim()
                      : "..."}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Email:</span>
                  <span className="text-right break-all text-xs md:text-sm max-w-48">
                    {userBeforeAction ? userBeforeAction.email?.trim() : "..."}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Stream:</span>
                  <span className="capitalize">
                    {userBeforeAction ? userBeforeAction.stream?.trim() : "..."}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Meal Status:</span>
                  <span
                    className={`font-medium ${userBeforeAction?.meal ? "text-red-400" : "text-green-400"}`}
                  >
                    {userBeforeAction
                      ? userBeforeAction.meal
                        ? "Already eaten"
                        : "Not eaten"
                      : "..."}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Checked In:</span>
                  <span
                    className={`font-medium ${userBeforeAction?.checkedin ? "text-green-400" : "text-red-400"}`}
                  >
                    {userBeforeAction
                      ? userBeforeAction.checkedin
                        ? "Yes"
                        : "No"
                      : "..."}
                  </span>
                </div>
              </div>
            </div>
            {scanError && (
              <div className="w-full max-w-md">
                <p className="rounded-md bg-red-900/20 border border-red-400/20 p-3 font-medium text-red-400 text-sm">
                  {scanError}
                </p>
              </div>
            )}
            <div className="flex flex-col items-center gap-3 mt-4">
              <p className="text-sm text-white/60">
                Tap anywhere or press any key to start scanning
              </p>
              <Button
                onClick={handleStartNewScan}
                variant={"outline"}
                className="rounded-md px-6 py-3 text-base md:text-lg text-cyan-300 border-cyan-300 hover:bg-cyan-300/10"
              >
                Start Scanning
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <Scanner
              onScan={async (detectedCodes) => {
                if (detectedCodes.length > 0 && isScanning) {
                  const userId = detectedCodes[0].rawValue;
                  setIsScanning(false); // Stop scanning immediately

                  try {
                    const userData: InferSelectModel<typeof users> =
                      await performScanAction(userId, selectedAction);
                    setUserBeforeAction(userData);
                    setLastUser(userData);

                    const userName = `${userData.firstName?.trim() || ""} ${
                      userData.lastName?.trim() || ""
                    }`.trim();

                    if (selectedAction) {
                      toast.success(
                        `'${selectedAction}' completed for ${userName}`,
                      );
                    } else {
                      toast.success(`User found: ${userName}`);
                    }
                  } catch (error) {
                    console.error("Scan error:", error);
                    const errorMessage =
                      error instanceof Error
                        ? error.message
                        : "An unknown error occurred";
                    setScanError(errorMessage);
                    toast.error(`Scan failed: ${errorMessage}`);
                  } finally {
                    setCanStartNewScan(true);
                  }
                }
              }}
              onError={(error) => {
                console.log("Scanner error:", error);
              }}
              formats={["qr_code"]}
              paused={!isScanning}
              components={{
                torch: true,
                finder: true,
              }}
              classNames={{
                container: "w-full max-w-sm",
                video: "rounded-lg shadow-lg",
              }}
            />
            <p className="text-sm text-white/60 mt-4">
              Align the QR code within the scanner frame
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
