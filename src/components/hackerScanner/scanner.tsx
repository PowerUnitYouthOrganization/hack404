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
    const requestOptions: RequestInit = action
      ? {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        }
      : { method: "GET" };

    const response = await fetch(`/admin/api/users/${userId}`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Request failed with status ${response.status}`,
      );
    }
    return response.json();
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
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
            <p className="text-lg md:text-2xl text-white">
              Last scan was{" "}
              <b>
                {lastUser
                  ? lastUser.firstName?.trim() + " " + lastUser.lastName?.trim()
                  : "..."}
              </b>
              <br />
              Email: {lastUser ? lastUser.email?.trim() : "..."}
              <br />
              Stream: {lastUser ? lastUser.stream?.trim() : "..."}
              <br />
              Meal status: {lastUser ? (lastUser.meal ? "Yes" : "No") : "..."}
            </p>
            {scanError && (
              <p className="my-2 rounded-md bg-red-900 p-3 font-semibold text-red-400">
                {scanError}
              </p>
            )}
            <p className="text-sm text-white/60">
              Tap anywhere or press any key to start scanning
            </p>
            <Button
              onClick={handleStartNewScan}
              variant={"outline"}
              className="rounded-md px-6 py-3 text-lg md:text-2xl text-cyan-300 border-cyan-300 hover:bg-cyan-300/10"
            >
              Tap Here to Start Scanning
            </Button>
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
